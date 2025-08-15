import Store from 'electron-store';

// Configuration keys interface for type safety
interface ConfigSchema {
    videosDirectory?: string;
    gptToken?: string;
}

// Default configuration values
const DEFAULT_CONFIG: Partial<ConfigSchema> = {

};

export class ConfigService {
    private static store: Store<ConfigSchema>;
    private static instance: ConfigService;

    private constructor() {
        // Private constructor to prevent direct instantiation
    }

    /**
     * Initialize the store (call this once at app startup)
     */

    //Note that this is not intended for security purposes, since the encryption key would be easily 
    //found inside a plain - text Node.js app.
    //
    //Its main use is for obscurity.If a user looks through the config directory and finds the config file, 
    //since it's just a JSON file, they may be tempted to modify it. By providing an encryption key, the
    // file will be obfuscated, which should hopefully deter any users from doing so.

    static initialize(): void {
        if (!this.store) {
            this.store = new Store<ConfigSchema>({
                defaults: DEFAULT_CONFIG,
                name: 'config',
                fileExtension: 'json',
                encryptionKey: 'SBDS9ZB8pr/RUgSeQWnd/tfuocRiNCVmctwsOCFGhUlE36eD+IwaU/Hi9i9t8OdD'
            });
        }
    }

    /**
     * Get a configuration value
     */
    static get<K extends keyof ConfigSchema>(key: K): ConfigSchema[K] {
        this.ensureInitialized();
        return this.store.get(key);
    }

    /**
     * Set a configuration value
     */
    static set<K extends keyof ConfigSchema>(key: K, value: ConfigSchema[K]): void {
        this.ensureInitialized();
        this.store.set(key, value);
    }

    /**
     * Check if a configuration key exists
     */
    static has(key: keyof ConfigSchema): boolean {
        this.ensureInitialized();
        return this.store.has(key);
    }

    /**
     * Delete a configuration key
     */
    static delete(key: keyof ConfigSchema): void {
        this.ensureInitialized();
        this.store.delete(key);
    }

    /**
     * Clear all configuration
     */
    static clear(): void {
        this.ensureInitialized();
        this.store.clear();
    }

    /**
     * Get all configuration as an object
     */
    static getAll(): ConfigSchema {
        this.ensureInitialized();
        return this.store.store;
    }

    /**
     * Set multiple configuration values at once
     */
    static setMultiple(config: Partial<ConfigSchema>): void {
        this.ensureInitialized();
        Object.entries(config).forEach(([key, value]) => {
            this.store.set(key as keyof ConfigSchema, value);
        });
    }

    /**
     * Reset to default configuration
     */
    static resetToDefaults(): void {
        this.ensureInitialized();
        this.store.clear();
        this.setMultiple(DEFAULT_CONFIG);
    }

    /**
     * Get the store file path
     */
    static getStorePath(): string {
        this.ensureInitialized();
        return this.store.path;
    }

    // Specific helper methods for common operations

    /**
     * Videos directory management
     */
    static getVideosDirectory(): string | undefined {
        return this.get('videosDirectory');
    }

    static setVideosDirectory(path: string): void {
        this.set('videosDirectory', path);
    }

    /**
     * GPT Token management
     */
    static getGptToken(): string | undefined {
        return this.get('gptToken');
    }

    static setGptToken(token: string): void {
        this.set('gptToken', token);
    }

    /**
     * Installation status management
     */
    /* static isFFmpegInstalled(): boolean {
      return this.get('ffmpegInstalled') || false;
    } */

    /* static setFFmpegInstalled(installed: boolean): void {
      this.set('ffmpegInstalled', installed);
    } */

    /* static isUVRInstalled(): boolean {
      return this.get('uvrInstalled') || false;
    } */

    /* static setUVRInstalled(installed: boolean): void {
      this.set('uvrInstalled', installed);
    } */

    /**
     * Setup completion checker
     */
    /* static getSetupStatus(): number {
      if (!this.has('videosDirectory')) return -1;
      if (!this.has('gptToken')) return -2;
      if (!this.isFFmpegInstalled()) return -3;
      if (!this.isUVRInstalled()) return -4;
      return 0; // Setup complete
    } */

    /**
     * Check if this is the first launch
     */
    /* static isFirstLaunch(): boolean {
      return this.get('firstLaunch') || true;
    } */

    /* static setFirstLaunchComplete(): void {
      this.set('firstLaunch', false);
    } */

    /**
     * Theme management
     */
    /* static getTheme(): 'light' | 'dark' {
      return this.get('theme') || 'dark';
    } */

    /* static setTheme(theme: 'light' | 'dark'): void {
      this.set('theme', theme);
    } */

    /**
     * Export configuration to JSON string
     */
    static exportConfig(): string {
        return JSON.stringify(this.getAll(), null, 2);
    }

    /**
     * Import configuration from JSON string
     */
    static importConfig(configJson: string): void {
        try {
            const config = JSON.parse(configJson);
            this.setMultiple(config);
        } catch (error) {
            throw new Error('Invalid configuration JSON');
        }
    }

    /**
     * Ensure store is initialized before use
     */
    private static ensureInitialized(): void {
        if (!this.store) {
            this.initialize();
        }
    }
}