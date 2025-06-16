
export type PromiseHandlers = {
  resolve: (value?: any) => void;
  reject: (reason?: any) => void;
};

export interface ManagerMsg {
  id: string;
  command: string;
  data: any;
}

export interface WorldConfig {
  name: string;
  launch_file_path: string;
  ros_version: string;
  world: string;
  zip?: unknown;
}

export interface RobotConfig {
  name: string | null;
  launch_file_path: string | null;
  ros_version: string | null;
  visualization: string | null;
  world: string | null;
  start_pose: string | null;
}

export interface UniverseConfig {
  name: string;
  world: WorldConfig;
  robot: RobotConfig;
}

export type Events = string | string[];

export const events = {
  RESPONSES: ["ack", "error"],
  UPDATE: "update",
  STATE_CHANGED: "state-changed",
  INTROSPECTION: "introspection",
  CODE_FORMAT: "code-format",
  CODE_ANALYSIS: "code-analysis",
  CODE_AUTOCOMPLETE: "code-autocomplete",
};

export const states = {
  IDLE: "idle",
  CONNECTED: "connected",
  WORLD_READY: "world_ready",
  VISUALIZATION_READY: "visualization_ready",
  RUNNING: "application_running",
  PAUSED: "paused",
};