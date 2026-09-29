# jderobot-commsmanager

A TypeScript library to manage WebSocket communication for JdeRobot applications, providing a structured API to interact with the robotics backend.

## Key Features

- **Singleton Manager**: A central `CommsManager` to coordinate backend connections.
- **WebSocket Communication**: Reliable JSON-based message passing over WebSockets using `websocket-ts`.
- **Command Abstraction**: High-level methods to launch worlds, prepare tools, run/pause/stop code, and manage application lifecycles.
- **Event System**: Built-in subscription mechanism (`subscribe`, `unsubscribe`) to listen for backend events and state changes.
- **Code Assistance**: Built-in requests for style checking, formatting, code analysis, and autocompletion.

## Technology Stack

- **TypeScript**
- **Webpack**
- **WebSocket-TS**
- **UUID**

## Project Structure

```text
src/
├── components/       # Core manager class (CommsManager)
├── types/            # TypeScript interfaces and event definitions
├── utils/            # Event dispatch utilities
└── index.ts          # Main library entrypoint
```

## Requirements

- Node.js (v24.x recommended based on CI workflows)
- npm or yarn

## Installation

```bash
npm install jderobot-commsmanager
```

*Note: This package requires `uuid` and `websocket-ts` as dependencies.*

## Development Setup

1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Build the project using Webpack (outputs to `dist/`):
   ```bash
   npm run build
   ```
4. Format the source code with Prettier:
   ```bash
   npm run format
   ```

*Note: Tests are not currently configured for this project.*

## Usage

### Connecting to the Backend

```typescript
import { CommsManager } from "jderobot-commsmanager";

// Get the singleton instance. Defaults to ws://127.0.0.1:7163 if no address is provided.
const manager = CommsManager.getInstance("ws://127.0.0.1:7163");

// Connect to the WebSocket server
manager.connect().then(() => {
  console.log("Connected to backend!");
}).catch(err => {
  console.error("Connection failed:", err);
});
```

### Listening to Events

```typescript
import { events } from "jderobot-commsmanager";

// Listen to state changes
manager.subscribe(events.STATE_CHANGED, (msg) => {
  console.log("State changed:", msg.data.state);
});

// Listen to introspection data once
manager.subscribeOnce(events.INTROSPECTION, (msg) => {
  console.log("Host Data:", manager.getHostData());
});
```

### Managing the Application Lifecycle

```typescript
// Launch a world
manager.launchWorld({
  name: "my_world",
  scene: {
    name: "scene1",
    launch_file_path: "/path/to/launch",
    ros_version: "2",
    world: "default"
  },
  robot: []
});

// Run application code
manager.run("main.py", ["pylint"], "print('Hello World')");

// Pause execution
manager.pause();

// Stop execution
manager.stop();

// Terminate
manager.terminateApplication();
```

### API Reference

#### `CommsManager` Methods

- **Lifecycle:** `connect()`, `disconnect()`, `reset()`
- **Execution:** `run(entrypoint, to_lint, code)`, `pause()`, `resume()`, `stop()`
- **Environment:** `launchWorld(cfg)`, `prepareTools(tools, tools_config)`
- **Termination:** `terminateApplication()`, `terminateTools()`, `terminateWorld()`
- **Code Assistance:** `style_check(code)`, `code_format(code)`, `code_analysis(code, disable_errors)`, `code_autocomplete(code, line, col)`
- **State/Data:** `getState()`, `getHostData()`, `getWorld()`
- **Events:** `subscribe(events, callback)`, `subscribeOnce(events, callback)`, `unsubscribe(events, callback)`, `unsuscribeAll()`
- **Instance Management:** `CommsManager.getInstance(address?)`, `CommsManager.deleteInstance()`

#### Available States

- `idle`
- `connected`
- `world_ready`
- `tools_ready`
- `application_running`
- `paused`

## Deployment

The package is automatically built and published to the npm registry (`npmjs.org`) using GitHub Actions whenever a new release is created on GitHub.

## License

This project is licensed under the ISC License.
