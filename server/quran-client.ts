import axios, { AxiosRequestConfig } from "axios";

interface QuranAPIClientOptions {
  clientId: string;
  clientSecret: string;
  tokenEndpoint: string;
  apiBaseUrl: string;
}

interface VersesOptions {
  language?: string;
  words?: boolean;
  translations?: string;
  audio?: boolean;
  tafsirs?: string;
  word_fields?: string;
  translation_fields?: string;
  fields?: string;
  page?: number;
  per_page?: number;
}

export class QuranAPIClient {
  private clientId: string;
  private clientSecret: string;
  private tokenEndpoint: string;
  private apiBaseUrl: string;
  private accessToken: string | null;
  private tokenExpiry: number | null;

  constructor({ clientId, clientSecret, tokenEndpoint, apiBaseUrl }: QuranAPIClientOptions) {
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.tokenEndpoint = tokenEndpoint;
    this.apiBaseUrl = apiBaseUrl;
    this.accessToken = null;
    this.tokenExpiry = null;
  }

  async getAccessToken() {
    // Return cached token if still valid (with 5 min buffer)
    if (this.accessToken && this.tokenExpiry && Date.now() < this.tokenExpiry - 300000) {
      return this.accessToken;
    }

    const auth = Buffer.from(`${this.clientId}:${this.clientSecret}`).toString("base64");

    const response = await axios({
      method: "post",
      url: this.tokenEndpoint,
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: "grant_type=client_credentials&scope=content",
    });

    if (!response.status || response.status < 200 || response.status >= 300) {
      throw new Error(`OAuth2 token request failed: ${response.status}`);
    }

    const token = response.data.access_token;
    this.accessToken = token;

    // Token expires in 3600 seconds (1 hour)
    this.tokenExpiry = Date.now() + response.data.expires_in * 1000;
    return token;
  }

  async makeAuthenticatedRequest(endpoint: string, options: AxiosRequestConfig = {}) {
    const token = await this.getAccessToken();

    const defaultHeaders: Record<string, string> = {
      "x-auth-token": token,
      "x-client-id": this.clientId,
      "Content-Type": "application/json",
    };

    const headers = {
      ...(options.headers ?? {}),
      ...defaultHeaders,
    };

    const requestConfig: AxiosRequestConfig = {
      method: options.method ?? "get",
      url: `${this.apiBaseUrl}${endpoint}`,
      ...options,
      headers,
    };

    const response = await axios(requestConfig);

    if (!response || response.status < 200 || response.status >= 300) {
      throw new Error(`API request failed: ${response.status}`);
    }

    return response.data;
  }

  // Get Chapters :)
  async getChapters() {
    return this.makeAuthenticatedRequest("/chapters", {
      method: "get",
      maxBodyLength: Infinity,
      headers: { Accept: "application/json" },
    });
  }

  // Get a Chapters :)
  async getChapter(chapterId: string) {
    return this.makeAuthenticatedRequest(`/chapters/${chapterId}`, {
      method: "get",
      maxBodyLength: Infinity,
      headers: { Accept: "application/json" },
    });
  }

  // Get Verses :)
  async getVerses(chapterId: string, options: VersesOptions) {
    const params = new URLSearchParams({
      language: "en",
      page: String(options.page || 1),
      per_page: String(options.per_page || 10),
    });

    if (options.translations) {
      params.append("translations", options.translations);
    }

    if (options.words) {
      params.append("words", "true");
    }

    if (options.audio) {
      params.append("audio", "true");
    }

    if (options.tafsirs) {
      params.append("tafsirs", options.tafsirs);
    }

    // Add fields parameter to include Arabic text
    if (options.fields) {
      params.append("fields", options.fields);
    } else {
      // Default fields to include Arabic text
      params.append("fields", "text_uthmani");
    }

    return this.makeAuthenticatedRequest(`/verses/by_chapter/${chapterId}?${params}`, {
      headers: { Accept: "application/json" },
    });
  }

  // Get list of Chapter Reciters
  async getReciters() {
    return this.makeAuthenticatedRequest("/resources/chapter_reciters", {
      headers: { Accept: "application/json" },
    });
  }

  async getAudio(reciterId: string, chapterId: string, verseNumber: string) {
    // Use verse recitations endpoint for individual verse audio
    return this.makeAuthenticatedRequest(`/recitations/${reciterId}/by_ayah/${chapterId}:${verseNumber}`, {
      headers: { Accept: "application/json" },
    });
  }

  async getTranslations() {
    return this.makeAuthenticatedRequest("/resources/translations", {
      headers: { Accept: "application/json" },
    });
  }

  async getResources() {
    return this.makeAuthenticatedRequest("/resources/translations", {
      headers: { Accept: "application/json" },
    });
  }

  async getChapterTranslations(resourceId: number, chapterNumber: string) {
    return this.makeAuthenticatedRequest(`/translations/${resourceId}/by_chapter/${chapterNumber}`, {
      headers: { Accept: "application/json" },
    });
  }
}
