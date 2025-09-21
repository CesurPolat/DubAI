
export type Content = {

    //Content basic informations
    id: string;
    display_id: string;
    title: string;
    fulltitle: string;
    description: string;
    language: string;

    //Duration
    duration: number;//In seconds
    duration_string: string;

    //Upload date
    upload_date: string;
    timestamp: number;
    release_timestamp?: number;
    release_year?: number;
    
    //Statistics
    webpage_url: string;
    age_limit: number;
    view_count: number;
    like_count?: number;
    average_rating?: number;
    comment_count?: number;

    //Tags and categories
    categories: string[];
    tags: string[];

    //Video live status
    is_live: boolean;
    was_live: boolean;
    live_status: 'not_live' | 'is_live' | 'was_live';
    availability: "public" | "private" | "unlisted" | string;//Check a private video
    media_type?: 'audio' | 'video' | 'playlist' | 'unknown';
    _type: 'video' | 'audio' | 'unknown';

    //Uploader informations
    channel_id: string;
    channel_url: string;
    channel: string;
    channel_follower_count?: number;
    channel_is_verified?: boolean;
    uploader: string;
    uploader_id: string;
    uploader_url: string;

    //Download informations
    protocol: string;
    formats: ContentFormat[];
    requested_downloads?: ContentDownloadOptions[];
    requested_formats?: ContentFormat[];
    thumbnail: string;
    thumbnails: {id: number; url: string; preference: number; width?: number; height?: number; resolution?: string;}[];
    filesize_approx: number;

    //Captions and subtitles
    automatic_captions: Record<string, {ext:string; url: string; name: string; impersonate?: boolean; __yt_dlp_client:string;}[]>;
    subtitles: any[];//Check a subtitled video
    requested_subtitles?: any;//Check a video with subtitles

    //Interactive video informations
    chapters?: {start_time: number; end_time: number; title: string;}[];//Check a video with chapters
    heatmap?: {start_time: number; end_time: number; value: number;}[];

    // Extractor Informations
    extractor: string;
    extractor_key: string;
    original_url: string;
    webpage_url_basename: string;//Check a video with a custom url
    webpage_url_domain: string;

    //Playlist informations
    playlist?: any;//Check a video from a playlist
    playlist_index?: number;

    //Video Resolution and quality
    width: number;
    height: number;
    resolution: string;
    aspect_ratio: number;
    stretched_ratio?: number;
    dynamic_range: string;
    
    //Selected format informations
    format: string;
    format_id: string;
    format_note: string;
    ext: string;
    
    //Codec and Bitrates
    vcodec: string;
    acodec: string;
    fps: number;
    tbr: number;//Total Bit Rate
    vbr: number;//Video Bit Rate
    abr: number;//Audio Bit Rate
    asr: number;//Audio Sample Rate
    audio_channels: number;

    //Other informations    
    epoch: number;//When request was made
    _has_drm?: boolean;
    playable_in_embed: boolean;
    _format_sort_fields: string[];
    _version: {version: string; current_git_head?: string; release_git_head: string; repository: string;};
};

export type ContentFormat = {

    //Format informations
    format: string;
    format_id: string;
    format_note: string;
    ext: string;
    
    //Video Resolution and quality
    width?: number;
    height?: number;
    resolution: string;
    aspect_ratio?: number;
    quality?: number;
    dynamic_range?: string;
    container?: string;
    
    //Codec and Bitrates
    video_ext: string;
    vcodec: string;
    audio_ext: string;
    acodec: string;
    fps?: number;
    tbr?: number;//Total Bit Rate
    vbr: number;//Video Bit Rate
    abr: number;//Audio Bit Rate
    asr?: number;//Audio Sample Rate
    audio_channels?: number;

    //Download informations
    protocol: string;
    url: string;
    fragments?: {url: string; duration: number;}[];//only in storyboard response
    download_options?: {http_chunk_size: number;}//In videos
    http_headers: Record<string, string>;
    filesize?: number;
    filesize_approx?: number;
    

    //Other informations
    available_at?: number;//When the request was made
    has_drm?: boolean;
    rows: number;
    columns: number;

    preference?: number;
    source_preference?: number;

    language?: string;
    language_preference?: number;

};

export type ContentDownloadOptions = {
    
    //Format informations
    format: string;
    format_id: string;
    format_note: string;
    ext: string;
    language: string;//TODO: check with a no audio video
    filename: string;
    _filename: string;
    __write_download_archive: boolean;
    
    //Video Resolution and quality
    width: number;
    height: number;
    resolution: string;
    aspect_ratio: number;
    dynamic_range: string;
    
    //Codec and Bitrates
    vcodec: string;
    acodec: string;
    fps: number;
    tbr: number;//Total Bit Rate
    vbr: number;//Video Bit Rate
    abr: number;//Audio Bit Rate
    asr: number;//Audio Sample Rate
    audio_channels: number;
    
    //Download informations
    protocol: string;
    requested_formats?: ContentFormat[];
    filesize_approx: number;
    
};