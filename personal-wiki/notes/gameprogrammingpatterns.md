# Game programming patterns

# `Game programming patterns`

Design patterns and architectural techniques specifically tailored for game development to manage complexity, performance, and maintainability.

## Introduction

* **Game programming patterns** address unique challenges in game development
* Games require real-time performance, complex state management, and frequent changes
* Patterns help organize code for graphics, audio, input, AI, and gameplay systems
* Balance between performance optimization and code maintainability
* Derived from general software patterns but adapted for game-specific requirements

## Architecture Patterns

```
// ----- GAME LOOP -----
    // Central pattern that drives all game execution
    // Continuous cycle of input processing, game logic updates, and rendering
    // Fixed timestep vs variable timestep considerations
    // Frame rate independence and deterministic simulation

// BASIC GAME LOOP STRUCTURE:
while (running) {
    processInput();     // Handle user input and system events
    update(deltaTime);  // Update game world state and logic  
    render();          // Draw current frame to screen
}

// FIXED TIMESTEP
    // Updates occur at regular intervals regardless of frame rate
    // Ensures deterministic simulation and consistent physics
    // May require interpolation for smooth visual rendering
    // Example: 60Hz update rate with variable rendering frequency

// VARIABLE TIMESTEP  
    // Update time based on actual elapsed time since last frame
    // Simpler implementation but can cause instability
    // Large delta times can break physics or cause spiral of death
    // Requires careful handling of minimum/maximum timestep values

// ----- COMPONENT PATTERN -----
    // Composition over inheritance for game entity design
    // Entities composed of reusable components rather than deep inheritance
    // Flexible system allowing mix-and-match of behaviors
    // Unity's GameObject/Component system is prime example

class GameObject {
    private List components;

    public void addComponent(Component component);
    public  T getComponent(Class componentType);
    public void update(float deltaTime);
    public void render();
}

// COMPONENT TYPES:
    // Transform => position, rotation, scale in world space
    // Renderer => visual representation and drawing
    // Physics => collision detection and physics simulation  
    // Input => handling user input for controllable entities
    // AI => artificial intelligence behaviors and decision making
    // Audio => sound effects and music playback
```

## Behavioral Patterns

```
// ----- STATE MACHINE -----
    // Manages object behavior through discrete states
    // Clean transitions between different behavioral modes
    // Prevents invalid state combinations and illegal transitions
    // Essential for character AI, game modes, and UI flow

// FINITE STATE MACHINE (FSM)
class StateMachine {
    private State currentState;
    private Map transitions;

    public void update() {
        State nextState = currentState.update();
        if (nextState != null) {
            changeState(nextState);
        }
    }
}

// CHARACTER STATES EXAMPLE:
    // Idle => standing still, waiting for input
    // Walking => moving across terrain at normal speed
    // Running => fast movement with different animation
    // Jumping => airborne state with gravity effects
    // Attacking => combat actions with timing windows
    // Dead => inactive state preventing further actions

// ----- COMMAND PATTERN -----
    // Encapsulates actions as objects for flexibility
    // Enables undo/redo functionality and macro recording
    // Decouples input handling from action execution
    // Useful for input mapping and network replication

interface Command {
    void execute(Actor actor);
    void undo(Actor actor);
}

class MoveCommand implements Command {
    private Vector3 direction;

    public void execute(Actor actor) {
        actor.move(direction);
    }

    public void undo(Actor actor) {
        actor.move(-direction);
    }
}

// ----- OBSERVER PATTERN -----
    // Loose coupling between game systems through events
    // Achievement systems, UI updates, audio triggers
    // Event-driven architecture for responsive gameplay
    // Publish-subscribe mechanism for decoupled communication

class EventManager {
    private Map> listeners;

    public void subscribe(EventType type, EventListener listener);
    public void publish(Event event);
    private void notifyListeners(Event event);
}

// GAME EVENTS EXAMPLES:
    // PlayerDied => trigger respawn, update UI, play death sound
    // EnemyKilled => award points, spawn loot, update kill counter
    // LevelCompleted => save progress, show completion screen, unlock next level
    // ItemCollected => update inventory, play pickup sound, trigger particle effect
```

## Performance Patterns

```
// ----- OBJECT POOL -----
    // Pre-allocate objects to avoid garbage collection during gameplay
    // Critical for frequently created/destroyed objects (bullets, particles, enemies)
    // Maintains fixed-size pool of reusable objects
    // Improves performance by eliminating allocation/deallocation overhead

class ObjectPool {
    private Queue availableObjects;
    private Supplier objectFactory;

    public T acquire() {
        if (availableObjects.isEmpty()) {
            return objectFactory.get();
        }
        return availableObjects.poll();
    }

    public void release(T object) {
        object.reset();
        availableObjects.offer(object);
    }
}

// ----- FLYWEIGHT PATTERN -----
    // Minimize memory usage by sharing intrinsic data
    // Separate intrinsic (shared) from extrinsic (unique) object data
    // Particularly useful for tile-based games and particle systems
    // Terrain tiles, tree models, building textures share common data

class TreeType {
    private Mesh mesh;        // Intrinsic: shared 3D model
    private Texture texture;  // Intrinsic: shared surface texture

    public void render(Vector3 position, float scale) {
        // Extrinsic data passed as parameters
        renderMesh(mesh, texture, position, scale);
    }
}

// ----- SPATIAL PARTITIONING -----
    // Organize game objects spatially for efficient queries
    // Collision detection, visibility culling, AI neighbor finding
    // Common implementations: quadtree, octree, spatial hash
    // Reduces O(n²) brute-force searches to O(log n) or O(1)

// QUADTREE EXAMPLE:
class Quadtree {
    private Rectangle bounds;
    private List objects;
    private Quadtree[] children;

    public List queryRange(Rectangle range);
    public void insert(GameObject object);
    private void subdivide();
}
```

## Input and Control

```
// ----- INPUT HANDLER -----
    // Abstract input processing from specific devices
    // Support multiple input methods (keyboard, gamepad, touch)
    // Input buffering for complex move sequences
    // Configurable key bindings and input remapping

class InputManager {
    private Map> bindings;
    private Queue commandBuffer;

    public void update() {
        pollInputDevices();
        processBufferedCommands();
    }

    public void bindInput(InputDevice device, int key, Action action);
    public boolean isActionPressed(Action action);
    public boolean isActionHeld(Action action);
}

// ----- PLAYER CONTROLLER -----
    // Mediates between input and character actions
    // Handles input interpretation and action validation
    // State-dependent input processing (different actions per state)
    // Smooth movement interpolation and response curves

class PlayerController {
    private InputManager input;
    private Character character;
    private ControllerState state;

    public void update(float deltaTime) {
        Vector2 moveInput = input.getMovementVector();
        if (input.isActionPressed(Action.JUMP)) {
            character.tryJump();
        }
        character.move(moveInput * character.getMoveSpeed() * deltaTime);
    }
}
```

## Audio Patterns

```
// ----- SOUND MANAGER -----
    // Centralized audio playback and resource management
    // Audio mixing, volume control, and spatial audio
    // Sound effect pooling and music streaming
    // Platform-specific audio backend abstraction

class AudioManager {
    private Map soundLibrary;
    private List activeSources;
    private AudioSource musicSource;

    public void playSound(SoundID sound, Vector3 position, float volume);
    public void playMusic(MusicID music, boolean loop);
    public void setMasterVolume(float volume);
    public void pauseAll();
}

// ----- AUDIO EVENTS -----
    // Trigger sounds based on game events rather than direct calls
    // Decouples gameplay code from audio implementation
    // Allows designers to modify audio without code changes
    // Supports dynamic audio mixing and contextual sound selection

eventManager.subscribe(EventType.FOOTSTEP, (event) -> {
    TerrainType terrain = getTerrainAtPosition(event.position);
    SoundID footstepSound = getFootstepSound(terrain);
    audioManager.playSound(footstepSound, event.position, 0.7f);
});
```

## Rendering Patterns

```
// ----- RENDER QUEUE -----
    // Organize rendering operations for optimal GPU performance
    // Sort by render state to minimize state changes
    // Batch similar objects together for efficient drawing
    // Separate queues for opaque, transparent, and UI objects

class RenderQueue {
    private List opaqueCommands;
    private List transparentCommands;
    private List uiCommands;

    public void submit(RenderCommand command) {
        switch (command.type) {
            case OPAQUE: opaqueCommands.add(command); break;
            case TRANSPARENT: transparentCommands.add(command); break;
            case UI: uiCommands.add(command); break;
        }
    }

    public void render() {
        Collections.sort(opaqueCommands, frontToBackComparator);
        Collections.sort(transparentCommands, backToFrontComparator);
        executeCommands(opaqueCommands);
        executeCommands(transparentCommands);
        executeCommands(uiCommands);
    }
}

// ----- SCENE GRAPH -----
    // Hierarchical organization of rendered objects
    // Transform inheritance through parent-child relationships  
    // Visibility culling and level-of-detail management
    // Efficient traversal for rendering and updates

class SceneNode {
    private Transform localTransform;
    private Transform worldTransform;
    private List children;
    private List renderables;

    public void updateTransforms(Transform parentTransform) {
        worldTransform = parentTransform.combine(localTransform);
        for (SceneNode child : children) {
            child.updateTransforms(worldTransform);
        }
    }
}
```

## AI Patterns

```
// ----- BEHAVIOR TREES -----
    // Hierarchical AI decision making through composable nodes
    // More flexible than state machines for complex behaviors
    // Designer-friendly visual editing and modification
    // Reusable behavior components across different AI agents

abstract class BehaviorNode {
    public enum Status { SUCCESS, FAILURE, RUNNING }

    public abstract Status update(AIAgent agent, float deltaTime);
}

class SequenceNode extends BehaviorNode {
    private List children;
    private int currentChild = 0;

    public Status update(AIAgent agent, float deltaTime) {
        while (currentChild  data;

    public  void setValue(String key, T value) {
        data.put(key, value);
    }

    public  T getValue(String key, Class type) {
        return type.cast(data.get(key));
    }

    public boolean hasValue(String key) {
        return data.containsKey(key);
    }
}

// AI COORDINATION EXAMPLE:
    // Squad leader sets "rally_point" on blackboard
    // Squad members read rally_point for group movement
    // Alert states shared through "threat_level" value
    // Resource sharing through "available_weapons" list
```

## Data Management

```
// ----- GAME SAVE SYSTEM -----
    // Persistent storage of game state and player progress
    // Serialization of complex object hierarchies
    // Version compatibility and migration handling
    // Cloud save synchronization and conflict resolution

class SaveManager {
    private Serializer serializer;
    private EncryptionService encryption;

    public void saveGame(GameState state, String filename) {
        byte[] data = serializer.serialize(state);
        byte[] encrypted = encryption.encrypt(data);
        fileSystem.writeBytes(filename, encrypted);
    }

    public GameState loadGame(String filename) {
        byte[] encrypted = fileSystem.readBytes(filename);
        byte[] data = encryption.decrypt(encrypted);
        return serializer.deserialize(data, GameState.class);
    }
}

// ----- RESOURCE MANAGER -----
    // Centralized loading and caching of game assets
    // Memory management and asset lifetime tracking
    // Asynchronous loading for seamless gameplay
    // Reference counting and automatic cleanup

class ResourceManager {
    private Map> cache;
    private ExecutorService loadingThreads;

    public  Future loadAsync(String path, Class type) {
        return loadingThreads.submit(() -> {
            T resource = loadFromDisk(path, type);
            cache.put(path, new WeakReference<>(resource));
            return resource;
        });
    }
}
```

## More on

* [Game Programming Patterns](https://gameprogrammingpatterns.com/) by Robert Nystrom - Complete online book
* [Real-Time Rendering](https://www.realtimerendering.com/) by Tomas Akenine-Möller, Eric Haines, and Naty Hoffman
* [Game Engine Architecture](https://www.gameenginebook.com/) by Jason Gregory
* [Game AI Pro](http://www.gameaipro.com/) - Multi-volume series on game artificial intelligence
* [GPU Gems](https://developer.nvidia.com/gpugems/gpugems/contributors) - NVIDIA's graphics programming techniques
* [Gamasutra](https://www.gamedeveloper.com/) - Game development articles and postmortems
* [Unity Learn](https://learn.unity.com/) - Game development tutorials and best practices
* [Unreal Engine Documentation](https://docs.unrealengine.com/) - Comprehensive engine documentation
* [Game Development Stack Exchange](https://gamedev.stackexchange.com/) - Q&A community for game developers
* [GDC Vault](https://www.gdcvault.com/) - Game Developers Conference presentations and talks
