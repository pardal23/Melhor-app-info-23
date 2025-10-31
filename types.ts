
export interface Technology {
  name: string;
  version?: string;
  description?: string;
  details?: string;
}

export interface TechStack {
  contentManagementSystem?: Technology[];
  serverSideLanguages?: Technology[];
  clientSideLanguages?: Technology[];
  jsLibraries?: Technology[];
  reverseProxyServices?: Technology[];
  dnsProvider?: Technology[];
  sslCertificateAuthorities?: Technology[];
  trafficAnalysisTools?: Technology[];
  advertisingNetworks?: Technology[];
  tagManagers?: Technology[];
  siteElements?: Technology[];
  structuredDataFormats?: Technology[];
  imageFormats?: Technology[];
  topLevelDomain?: Technology[];
  contentLanguage?: Technology[];
}

export type TechCategory = keyof TechStack;
