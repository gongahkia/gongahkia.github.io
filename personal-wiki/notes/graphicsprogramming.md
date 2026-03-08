# Graphics Programming

# `Graphics Programming`

An overview of common APIs and languages used for graphics programming.

## Introduction to Graphics Programming

Graphics programming involves using computers to create and manipulate visual images. It is a broad field that includes 2D and 3D graphics, rendering, and animation. At its core, it is about communicating with the Graphics Processing Unit (GPU) to render scenes. This is typically done through a graphics API (Application Programming Interface).

### The Rendering Pipeline

The rendering pipeline is a sequence of steps that the GPU takes to render a 3D scene to a 2D screen. The modern, programmable pipeline consists of several stages, some of which can be controlled by developers using shaders. The main stages are:

1. **Vertex Shader:** Processes individual vertices and their attributes (position, color, texture coordinates).
2. **Tessellation/Geometry Shader (Optional):** Can create new geometry on the fly.
3. **Rasterization:** Converts geometric primitives (triangles, lines) into fragments (pixels).
4. **Fragment Shader:** Processes individual fragments to determine their final color.
5. **Framebuffer Operations:** The final fragments are written to the framebuffer, which is then displayed on the screen.

## OpenGL (Open Graphics Library)

OpenGL is a mature, cross-platform API for rendering 2D and 3D vector graphics. It is known for being a state machine, where you set various states (like the current color or transformation matrix) and then issue drawing commands.

### Key Concepts

* **Graphics Pipeline:** As described above, OpenGL implements this pipeline.
* **Shaders:** Programs written in GLSL that run on the GPU.
* **State Machine:** You set the context for rendering by changing OpenGL's state. For example, you bind a texture or a shader, and it remains active until you unbind it or bind something else.
* **Vertex Buffer Objects (VBOs) and Vertex Array Objects (VAOs):** VBOs are memory buffers on the GPU for storing vertex data. VAOs store the configuration of vertex attributes, so you can quickly switch between different object-rendering setups.

## GLSL (OpenGL Shading Language)

GLSL is a high-level shading language with a syntax based on C. It is used to write shaders for the OpenGL API.

### Example Vertex Shader

This shader takes a vertex position, a normal vector, and texture coordinates as input. It transforms the position using model, view, and projection matrices.

```
#version 330 core
layout (location = 0) in vec3 aPos;
layout (location = 1) in vec3 aNormal;
layout (location = 2) in vec2 aTexCoord;

out vec2 TexCoord;

uniform mat4 model;
uniform mat4 view;
uniform mat4 projection;

void main()
{
    gl_Position = projection * view * model * vec4(aPos, 1.0);
    TexCoord = aTexCoord;
}
```

### Example Fragment Shader

This shader uses the texture coordinates to sample a color from a texture.

```
#version 330 core
out vec4 FragColor;

in vec2 TexCoord;

uniform sampler2D ourTexture;

void main()
{
    FragColor = texture(ourTexture, TexCoord);
}
```

## WebGL (Web Graphics Library)

WebGL is a JavaScript API for rendering interactive 2D and 3D graphics within any compatible web browser without plug-ins. It is based on OpenGL ES, a subset of OpenGL for embedded systems.

### Relationship to the Browser

WebGL renders to the HTML `<canvas>` element. You get a WebGL rendering context from a canvas and then use the WebGL API to draw to it. Popular libraries like **Three.js** and **Babylon.js** provide higher-level abstractions over the verbose WebGL API.

### Example: Getting a WebGL Context

```
const canvas = document.getElementById('myCanvas');
const gl = canvas.getContext('webgl');

if (!gl) {
  alert('WebGL not supported!');
}
```

## Vulkan

Vulkan is a modern, low-overhead, cross-platform 3D graphics and computing API. It provides much more direct control over the GPU than OpenGL, which can lead to better performance but also requires more code.

### Key Concepts

* **Explicit API:** Unlike OpenGL's state machine, nothing happens in Vulkan unless you explicitly tell it to. You must manage memory, synchronization, and command submission yourself.
* **Command Buffers:** You record rendering commands into command buffers ahead of time. These can then be submitted to the GPU for execution, which is very efficient.
* **Validation Layers:** Because Vulkan has minimal error checking for performance reasons, you can enable validation layers during development to get detailed warnings and error messages.
* **Render Passes:** A render pass describes the set of attachments (images), subpasses, and dependencies between them, providing a structured way to handle rendering operations.

## DirectX

DirectX is a collection of APIs for multimedia tasks on Microsoft platforms. Its 3D graphics component, **Direct3D**, is the main competitor to OpenGL and Vulkan on Windows and Xbox.

### Key Components

* **Direct3D:** The 3D graphics API. DirectX 12 is the latest version and is a low-level API similar to Vulkan.
* **HLSL (High-Level Shading Language):** The shading language used with Direct3D.
* **Direct2D, DirectWrite, DirectSound:** Other components for 2D graphics, text, and audio.

## HLSL (High-Level Shading Language)

HLSL is the shading language for DirectX. Its syntax is very similar to GLSL and C.

### Example Pixel Shader (Fragment Shader)

```
Texture2D txDiffuse : register(t0);
SamplerState samLinear : register(s0);

struct PS_INPUT
{
    float4 pos : SV_POSITION;
    float2 uv : TEXCOORD0;
};

float4 main(PS_INPUT input) : SV_Target
{
    return txDiffuse.Sample(samLinear, input.uv);
}
```

## Metal

Metal is Apple's low-level graphics API for iOS, macOS, and tvOS. It was designed to provide high performance and low overhead, similar to Vulkan and DirectX 12.

### Key Concepts

* **Metal Shading Language (MSL):** The shading language for Metal, based on C++.
* **Command-based:** Like Vulkan, you encode commands into a command buffer and then commit it to a command queue for the GPU to execute.
* **Unified Memory Model:** On some Apple hardware, the CPU and GPU share memory, which can improve performance by avoiding the need to copy data.

## BGFX

BGFX is a cross-platform, graphics API-agnostic rendering library. It provides a single, unified API that works with multiple rendering backends, such as Direct3D, OpenGL, Vulkan, and Metal.

### Cross-Platform Nature

BGFX abstracts away the differences between the underlying graphics APIs. You write your rendering code once using the BGFX API, and it can be compiled to run on different platforms with their native graphics APIs. It also has its own shader compiler, `shaderc`, to cross-compile shaders.

## OSL (Open Shading Language)

OSL is a shading language developed by Sony Pictures Imageworks for offline, physically-based rendering. It is not designed for real-time graphics like GLSL and HLSL.

### Use in Rendering

OSL is used in high-end renderers for film and animation. It allows for the creation of very complex and realistic materials. OSL shaders are evaluated at runtime, and the renderer can optimize the shading calculations.

## More on

* [Learn OpenGL](https://learnopengl.com/)
* [WebGL Fundamentals](https://webglfundamentals.org/)
* [Vulkan Tutorial](https://vulkan-tutorial.com/)
* [DirectX Graphics and Gaming](https://docs.microsoft.com/en-us/windows/win32/directx)
* [Apple Metal Documentation](https://developer.apple.com/documentation/metal)
* [BGFX Documentation](https://bkaradzic.github.io/bgfx/overview.html)
* [Open Shading Language on GitHub](https://github.com/AcademySoftwareFoundation/OpenShadingLanguage)
