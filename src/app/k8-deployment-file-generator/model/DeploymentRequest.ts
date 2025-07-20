export interface DeploymentRequest {
  framework: string;
  appName: string;
  tag: string,
  dockerfileConfig: DockerfileConfig;
  port: number;
  envVariables: { [key: string]: string };
  secrets: { [key: string]: string };
  replicas: number;
  resourceLimits: ResourceLimits;
  enableIngress: boolean;
  ingressHost: string;
  enableHPA: boolean;
  hpa: HpaConfig;
}

export interface DockerfileConfig {
  baseImage: string;
  artifactName: string;
  labels: { [key: string]: string };
  arguments: { [key: string]: string };
}

export interface ResourceLimits {
  cpu: string;
  memory: string;
}

export interface HpaConfig {
  minReplicas: number;
  maxReplicas: number;
  targetCPUUtilizationPercentage: number;
}
