export interface CapacitorConfig {
  appId: string;
  appName: string;
  webDir: string;
  bundledWebRuntime?: boolean;
  server?: {
    androidScheme?: string;
  };
}

const config: CapacitorConfig = {
  appId: 'id.sch.smpialwasi.sipadu',
  appName: 'SIMPATIK for Counseling',
  webDir: 'dist',
  bundledWebRuntime: false,
  server: {
    androidScheme: 'https',
  },
};

export default config;
