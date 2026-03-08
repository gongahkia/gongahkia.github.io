# OS Development from scratch

# `OS Development from scratch`

Building an operating system kernel and associated components from the ground up to understand low-level system programming and computer architecture.

## Introduction

* **Operating System Development** involves creating the software layer between hardware and applications
* Requires understanding of computer architecture, assembly language, and systems programming
* Covers kernel development, device drivers, memory management, and process scheduling
* Educational journey through fundamental computer science concepts
* Provides deep insight into how modern operating systems function

## Prerequisites and Setup

```
// ----- DEVELOPMENT ENVIRONMENT -----
    // Cross-compilation toolchain for target architecture
    // QEMU or VirtualBox for testing and debugging
    // Assembly language knowledge (x86/x86_64, ARM, RISC-V)
    // C programming with understanding of pointers and memory management
    // Basic understanding of computer architecture and digital logic

// TOOLCHAIN SETUP (x86_64 TARGET)
    // GCC cross-compiler for bare metal development
    // NASM or GAS assembler for assembly language code
    // LD linker for combining object files
    // GRUB bootloader for initial system loading
    // Make or CMake for build automation

// HOST OPERATING SYSTEM
    // Linux => best support for cross-compilation tools
    // macOS => possible with Homebrew and cross-compilation setup  
    // Windows => WSL or virtual machine recommended
    // Docker containers for consistent development environment

// ----- HARDWARE ARCHITECTURE BASICS -----
    // CPU registers, instruction sets, and execution modes
    // Memory hierarchy: registers, cache, RAM, storage
    // Interrupt handling and exception mechanisms
    // I/O ports, memory-mapped I/O, and device communication
    // Boot process: BIOS/UEFI, bootloader, kernel initialization
```

## Boot Process and Initialization

```
# ----- BOOTLOADER DEVELOPMENT -----
    # First code executed when computer starts
    # Loaded by BIOS/UEFI firmware into memory
    # Must fit in 512-byte boot sector (MBR) or be chainloaded
    # Switches CPU from real mode to protected mode

# BOOT SECTOR ASSEMBLY (x86)
.code16                     # 16-bit real mode
.globl _start

_start:
    cli                     # Disable interrupts
    xor %ax, %ax           # Clear AX register  
    mov %ax, %ds           # Set data segment
    mov %ax, %ss           # Set stack segment
    mov $0x7C00, %sp       # Set stack pointer

    # Load kernel from disk
    mov $0x02, %ah         # BIOS read sector function
    mov $1, %al            # Number of sectors to read
    mov $0x0000, %ch       # Cylinder number
    mov $0x02, %cl         # Sector number (1-indexed)
    mov $0x00, %dh         # Head number
    mov $0x80, %dl         # Drive number (first hard disk)
    mov $0x1000, %bx       # Buffer address
    int $0x13              # BIOS interrupt

    jmp 0x1000             # Jump to loaded kernel

# ----- MODE SWITCHING -----
    # Real Mode => 16-bit, 1MB memory limit, BIOS services
    # Protected Mode => 32-bit, 4GB memory, memory protection
    # Long Mode => 64-bit, virtual memory, modern features

# PROTECTED MODE TRANSITION
    # Set up Global Descriptor Table (GDT)
    # Enable A20 line for extended memory access
    # Load GDT register and switch to protected mode
    # Update segment registers and jump to 32-bit code

# ----- MULTIBOOT SPECIFICATION -----
    # Standard interface between bootloader and kernel
    # GRUB bootloader support for automatic loading
    # Provides memory map and hardware information to kernel
    # Simplifies kernel development by handling low-level boot tasks

.section .multiboot
.align 4
.long 0x1BADB002          # Multiboot magic number
.long 0x00000003          # Multiboot flags  
.long -(0x1BADB002 + 0x00000003)  # Checksum
```

## Memory Management

```
// ----- PHYSICAL MEMORY MANAGEMENT -----
    // Track available RAM using bitmap or free list
    // Page frame allocation and deallocation
    // Memory map provided by BIOS/bootloader
    // Handle reserved and ACPI regions

class PhysicalMemoryManager {
    private BitMap usedFrames;
    private uint64_t totalMemory;
    private uint64_t usedMemory;

    public:
        void* allocateFrame();
        void freeFrame(void* frame);
        uint64_t getAvailableMemory();
}

// ----- VIRTUAL MEMORY MANAGEMENT -----
    // Paging enables virtual address spaces
    // Page tables map virtual to physical addresses
    // Memory protection and isolation between processes
    // Demand paging and page replacement algorithms

// x86_64 PAGE TABLE STRUCTURE
    // 4-level page table hierarchy (PML4, PDP, PD, PT)
    // Each entry contains physical address and flags
    // Present, Writable, User, No Execute bits
    // Translation Lookaside Buffer (TLB) caches mappings

struct PageTableEntry {
    uint64_t present : 1;
    uint64_t writable : 1;
    uint64_t user : 1;
    uint64_t writeThrough : 1;
    uint64_t cacheDisabled : 1;
    uint64_t accessed : 1;
    uint64_t dirty : 1;
    uint64_t reserved : 5;
    uint64_t address : 40;  # Physical address >> 12
    uint64_t reserved2 : 11;
    uint64_t noExecute : 1;
};

// ----- HEAP MANAGEMENT -----
    // Dynamic memory allocation for kernel and user programs
    // malloc/free implementation with coalescing
    // Slab allocator for fixed-size objects
    // Buddy system for efficient fragmentation handling

class HeapManager {
    private:
        FreeBlock* freeList;
        void* heapStart;
        size_t heapSize;

    public:
        void* malloc(size_t size);
        void free(void* ptr);
        void coalesceBlocks();
};
```

## Process Management

```
// ----- PROCESS CONTROL BLOCK -----
    // Data structure containing process state information
    // CPU registers, memory mappings, file descriptors
    // Process ID, parent ID, priority, scheduling info
    // Signal handlers and inter-process communication data

struct ProcessControlBlock {
    ProcessID pid;
    ProcessID parentPid;
    ProcessState state;
    CPUContext context;      // Saved CPU registers
    AddressSpace* addressSpace;
    FileDescriptor* files;
    SignalHandler* signals;
    Priority priority;
    TimeSlice timeSlice;
};

// PROCESS STATES
    // NEW => process being created
    // READY => waiting to be scheduled
    // RUNNING => currently executing on CPU
    // BLOCKED => waiting for I/O or event
    // TERMINATED => process finished execution

// ----- CONTEXT SWITCHING -----
    // Save current process state to PCB
    // Load next process state from PCB
    // Switch address spaces (page table)
    // Update CPU registers and jump to new process

void contextSwitch(Process* current, Process* next) {
    // Save current process context
    saveRegisters(&current->context);
    current->state = READY;

    // Load next process context  
    loadAddressSpace(next->addressSpace);
    loadRegisters(&next->context);
    next->state = RUNNING;

    // Jump to next process
    jumpToProcess(next);
}

// ----- PROCESS SCHEDULING -----
    // Decide which process to run next
    // Balance fairness, responsiveness, and efficiency
    // Preemptive vs cooperative scheduling
    // Real-time scheduling for time-critical tasks

// ROUND ROBIN SCHEDULER
class RoundRobinScheduler {
    private:
        Queue readyQueue;
        uint32_t timeQuantum;

    public:
        Process* selectNextProcess() {
            if (readyQueue.empty()) return nullptr;
            Process* next = readyQueue.front();
            readyQueue.pop();
            readyQueue.push(next);  // Move to back of queue
            return next;
        }

        void addProcess(Process* process) {
            readyQueue.push(process);
        }
};

// ----- SYSTEM CALLS -----
    // Interface between user programs and kernel
    // Controlled entry points for privileged operations
    // Parameter passing via registers or stack
    // Return values and error codes

// System call numbers
#define SYS_EXIT    1
#define SYS_READ    3
#define SYS_WRITE   4
#define SYS_OPEN    5
#define SYS_CLOSE   6

void syscallHandler(CPUContext* context) {
    uint64_t syscallNumber = context->rax;

    switch (syscallNumber) {
        case SYS_WRITE:
            context->rax = sysWrite(context->rdi, context->rsi, context->rdx);
            break;
        case SYS_READ:
            context->rax = sysRead(context->rdi, context->rsi, context->rdx);
            break;
        default:
            context->rax = -1;  // Invalid system call
    }
}
```

## Interrupt Handling

```
// ----- INTERRUPT DESCRIPTOR TABLE (IDT) -----
    // Table of interrupt and exception handlers
    // Hardware interrupts from devices (keyboard, timer, disk)
    // Software interrupts for system calls
    // CPU exceptions (page fault, divide by zero, illegal instruction)

struct IDTEntry {
    uint16_t offsetLow;     // Handler address bits 0-15
    uint16_t selector;      // Code segment selector
    uint8_t ist;           // Interrupt Stack Table index
    uint8_t attributes;     // Gate type and privilege level
    uint16_t offsetMiddle;  // Handler address bits 16-31
    uint32_t offsetHigh;    // Handler address bits 32-63
    uint32_t reserved;      // Must be zero
};

// IDT SETUP
class InterruptManager {
    private:
        IDTEntry idt;

    public:
        void installHandler(uint8_t vector, void (*handler)());
        void enableInterrupts();
        void disableInterrupts();
};

// ----- INTERRUPT CATEGORIES -----

// HARDWARE INTERRUPTS (IRQ)
    // Timer (IRQ 0) => system clock, preemptive scheduling
    // Keyboard (IRQ 1) => user input handling
    // Mouse (IRQ 12) => pointer device input
    // Hard Disk (IRQ 14/15) => storage device completion
    // Network Card => packet receive/transmit notifications

// CPU EXCEPTIONS
    // Page Fault (14) => memory access violation
    // General Protection Fault (13) => privilege violation
    // Divide by Zero (0) => arithmetic error
    // Invalid Opcode (6) => illegal instruction
    // Stack Fault (12) => stack segment issues

// SOFTWARE INTERRUPTS
    // System Call (0x80 or SYSCALL instruction)
    // User-defined interrupts for IPC
    // Debugging breakpoints and traps

// ----- INTERRUPT HANDLING FLOW -----
    // CPU saves current state on stack
    // IDT lookup determines handler address
    // Switch to kernel mode and jump to handler
    // Handler processes interrupt and signals completion
    // Return to interrupted code with IRET instruction

extern "C" void timerInterruptHandler() {
    // Acknowledge interrupt to PIC
    outb(0x20, 0x20);

    // Update system timer
    systemTicks++;

    // Preemptive scheduling check
    if (currentProcess->timeSlice scheduleNext();
    }
}

// ----- PROGRAMMABLE INTERRUPT CONTROLLER (PIC) -----
    // 8259 PIC manages hardware interrupt routing
    // Master PIC handles IRQ 0-7
    // Slave PIC handles IRQ 8-15
    // Interrupt masking and priority handling
    // Modern systems use Advanced PIC (APIC)

void initializePIC() {
    // Remap PIC vectors to avoid conflicts
    outb(0x20, 0x11);  // Initialize command to master PIC
    outb(0xA0, 0x11);  // Initialize command to slave PIC
    outb(0x21, 0x20);  // Master PIC vector offset (32)
    outb(0xA1, 0x28);  // Slave PIC vector offset (40)
    outb(0x21, 0x04);  // Tell master PIC about slave
    outb(0xA1, 0x02);  // Tell slave PIC about master
    outb(0x21, 0x01);  // Enable 8086 mode
    outb(0xA1, 0x01);  // Enable 8086 mode
    outb(0x21, 0x00);  // Unmask all interrupts
    outb(0xA1, 0x00);  // Unmask all interrupts
}
```

## Device Drivers

```
// ----- DRIVER ARCHITECTURE -----
    // Abstraction layer between kernel and hardware
    // Device-specific code isolated from kernel core
    // Standard interface for similar device types
    // Plug-and-play support and hot-swapping

class DeviceDriver {
    protected:
        DeviceType type;
        uint32_t baseAddress;
        uint8_t irq;

    public:
        virtual int initialize() = 0;
        virtual int read(void* buffer, size_t size) = 0;
        virtual int write(const void* buffer, size_t size) = 0;
        virtual void handleInterrupt() = 0;
};

// ----- KEYBOARD DRIVER -----
    // PS/2 keyboard controller interface
    // Scan code translation to ASCII
    // Modifier key handling (Shift, Ctrl, Alt)
    // Key repeat and debouncing

class KeyboardDriver : public DeviceDriver {
    private:
        uint8_t modifierState;
        CircularBuffer keyBuffer;

    public:
        void handleInterrupt() override {
            uint8_t scanCode = inb(0x60);
            KeyEvent event = translateScanCode(scanCode);
            keyBuffer.push(event);
        }

        KeyEvent getNextKey() {
            return keyBuffer.pop();
        }
};

// ----- STORAGE DRIVER -----
    // ATA/SATA hard disk interface
    // Sector-based read/write operations
    // DMA transfers for performance
    // Error handling and retry logic

class ATADriver : public DeviceDriver {
    private:
        uint16_t ioBase;
        bool isDMA;

    public:
        int readSector(uint32_t lba, void* buffer) {
            // Send read command to drive
            outb(ioBase + 6, 0xE0 | ((lba >> 24) & 0x0F));
            outb(ioBase + 2, 1);  // Sector count
            outb(ioBase + 3, lba & 0xFF);
            outb(ioBase + 4, (lba >> 8) & 0xFF);
            outb(ioBase + 5, (lba >> 16) & 0xFF);
            outb(ioBase + 7, 0x20);  // Read sectors command

            // Wait for drive ready
            while (!(inb(ioBase + 7) & 0x08));

            // Read data
            for (int i = 0; i data, data, length);
            buffer->length = length;

            // Configure DMA and start transmission
            configureTransmitDMA(buffer);
            triggerTransmission();
        }

        void handleInterrupt() override {
            uint32_t status = readInterruptStatus();

            if (status & RX_COMPLETE) {
                processReceivedPackets();
            }

            if (status & TX_COMPLETE) {
                releaseTransmitBuffers();
            }
        }
};
```

## File System

```
// ----- FILE SYSTEM INTERFACE -----
    // Virtual File System (VFS) abstraction
    // Multiple file system support (FAT32, ext2/3/4, NTFS)
    // File and directory operations
    // Metadata management and permissions

class VirtualFileSystem {
    private:
        Map mountPoints;
        FileDescriptorTable fdTable;

    public:
        int open(const char* path, int flags);
        int close(int fd);
        ssize_t read(int fd, void* buffer, size_t count);
        ssize_t write(int fd, const void* buffer, size_t count);
        int mkdir(const char* path, mode_t mode);
        int rmdir(const char* path);
};

// ----- FAT32 FILE SYSTEM -----
    // Microsoft's FAT32 file system implementation
    // File Allocation Table for cluster management
    // Long filename support and directory entries
    // Compatible with Windows and other operating systems

class FAT32FileSystem : public FileSystem {
    private:
        struct FAT32BootSector bootSector;
        uint32_t* fileAllocationTable;
        uint32_t rootDirectoryCluster;

    public:
        File* openFile(const char* filename) {
            DirectoryEntry entry = findDirectoryEntry(filename);
            if (entry.isValid()) {
                return new FAT32File(entry.startCluster, entry.fileSize);
            }
            return nullptr;
        }

        uint32_t getNextCluster(uint32_t cluster) {
            return fileAllocationTable[cluster] & 0x0FFFFFFF;
        }
};

// ----- INODE-BASED FILE SYSTEM -----
    // Unix-style file system with inodes
    // Efficient metadata storage and access
    // Hard links and symbolic links support
    // Journaling for crash recovery

struct Inode {
    uint32_t mode;          // File type and permissions
    uint32_t uid;           // User ID
    uint32_t gid;           // Group ID
    uint32_t size;          // File size in bytes
    uint32_t atime;         // Access time
    uint32_t ctime;         // Change time
    uint32_t mtime;         // Modification time
    uint32_t blocks;    // Direct and indirect block pointers[1]
};

// ----- BUFFER CACHE -----
    // Cache frequently accessed disk blocks
    // Write-back and write-through policies
    // LRU replacement algorithm
    // Dirty block tracking and flushing

class BufferCache {
    private:
        Map cache;
        LRUList lruList;

    public:
        CacheEntry* getBlock(BlockID block) {
            auto it = cache.find(block);
            if (it != cache.end()) {
                lruList.moveToFront(it->second);
                return it->second;
            }

            // Cache miss - load from disk
            CacheEntry* entry = loadFromDisk(block);
            insertIntoCache(block, entry);
            return entry;
        }

        void flushDirtyBlocks() {
            for (auto& entry : cache) {
                if (entry.second->isDirty) {
                    writeToDisk(entry.first, entry.second);
                    entry.second->isDirty = false;
                }
            }
        }
};
```

## User Space and System Services

```
// ----- USER SPACE PROGRAMS -----
    // ELF executable loading and execution
    // Dynamic linking and shared libraries
    // Process creation (fork/exec) and termination
    // Standard C library implementation

class ELFLoader {
    private:
        struct ELF64Header* elfHeader;
        struct ELF64ProgramHeader* programHeaders;

    public:
        Process* loadExecutable(const char* filename) {
            File* file = vfs->openFile(filename);
            elfHeader = (ELF64Header*)file->read(sizeof(ELF64Header));

            // Verify ELF signature
            if (elfHeader->signature != ELF_SIGNATURE) {
                return nullptr;
            }

            // Create new process
            Process* process = new Process();
            process->addressSpace = createAddressSpace();

            // Load program segments
            for (int i = 0; i phnum; i++) {
                loadProgramSegment(&programHeaders[i], process);
            }

            // Set entry point
            process->context.rip = elfHeader->entry;

            return process;
        }
};

// ----- SHELL IMPLEMENTATION -----
    // Command-line interface for user interaction
    // Command parsing and execution
    // Built-in commands and external programs
    // I/O redirection and pipes

class Shell {
    private:
        char commandBuffer;
        Map builtins;

    public:
        void run() {
            while (true) {
                print("$ ");
                readLine(commandBuffer, sizeof(commandBuffer));

                Command cmd = parseCommand(commandBuffer);
                if (isBuiltin(cmd.name)) {
                    executeBuiltin(cmd);
                } else {
                    executeProgram(cmd);
                }
            }
        }

        void executeProgram(const Command& cmd) {
            Process* child = fork();
            if (child->pid == 0) {
                // Child process
                exec(cmd.name, cmd.args);
            } else {
                // Parent process
                waitpid(child->pid);
            }
        }
};

// ----- INTER-PROCESS COMMUNICATION -----
    // Message passing between processes
    // Shared memory segments
    // Semaphores and mutexes
    // Named pipes and sockets

class MessageQueue {
    private:
        Queue messages;
        Semaphore semaphore;
        Mutex mutex;

    public:
        void send(const Message& msg) {
            mutex.lock();
            messages.push(msg);
            semaphore.signal();
            mutex.unlock();
        }

        Message receive() {
            semaphore.wait();
            mutex.lock();
            Message msg = messages.front();
            messages.pop();
            mutex.unlock();
            return msg;
        }
};

// ----- SYSTEM SERVICES -----
    // Device manager for hardware abstraction
    // Network stack (TCP/IP implementation)
    // Security and access control
    // Time and date services

class DeviceManager {
    private:
        Map drivers;

    public:
        void registerDriver(DeviceID id, DeviceDriver* driver) {
            drivers[id] = driver;
            driver->initialize();
        }

        int deviceOpen(DeviceID id, int flags) {
            auto it = drivers.find(id);
            if (it != drivers.end()) {
                return it->second->open(flags);
            }
            return -1;  // Device not found
        }
};
```

## Debugging and Testing

```
// ----- KERNEL DEBUGGING -----
    // Serial port output for debug messages
    // Kernel panic and stack trace generation
    // Memory corruption detection
    // Assertion macros for validation

#define ASSERT(condition) \
    if (!(condition)) { \
        kprintf("ASSERTION FAILED: %s:%d %s\n", __FILE__, __LINE__, #condition); \
        kernelPanic("Assertion failed"); \
    }

void kprintf(const char* format, ...) {
    va_list args;
    va_start(args, format);

    char buffer;
    vsprintf(buffer, format, args);

    // Output to serial port for debugging
    for (char* c = buffer; *c; c++) {
        serialWrite(*c);
    }

    va_end(args);
}

void kernelPanic(const char* message) {
    disableInterrupts();
    kprintf("KERNEL PANIC: %s\n", message);
    printStackTrace();

    // Halt the system
    while (true) {
        halt();
    }
}

// ----- UNIT TESTING -----
    // Test framework for kernel components
    // Mock objects for hardware interfaces
    // Automated test suites
    // Coverage analysis tools

class TestFramework {
    private:
        int testsRun;
        int testsPassed;
        int testsFailed;

    public:
        void runTest(const char* name, bool (*testFunc)()) {
            testsRun++;
            if (testFunc()) {
                kprintf("PASS: %s\n", name);
                testsPassed++;
            } else {
                kprintf("FAIL: %s\n", name);
                testsFailed++;
            }
        }

        void printResults() {
            kprintf("Tests run: %d, Passed: %d, Failed: %d\n", 
                    testsRun, testsPassed, testsFailed);
        }
};

// ----- SYSTEM TESTING -----
    // Boot testing in virtual machines
    // Stress testing with heavy workloads
    // Hardware compatibility testing
    // Performance benchmarking

// Memory allocation stress test
bool testMemoryAllocation() {
    const int numAllocs = 1000;
    void* ptrs[numAllocs];

    // Allocate memory blocks
    for (int i = 0; i  profiles);

    public:
        void profileFunction(const char* name, uint64_t duration) {
            ProfileData& data = profiles[name];
            data.functionCalls++;
            data.totalTime += duration;

            if (duration  data.maxTime) {
                data.maxTime = duration;
            }
        }

        void printProfile() {
            for (auto& entry : profiles) {
                kprintf("%s: calls=%lu, avg=%lu, min=%lu, max=%lu\n",
                        entry.first.c_str(),
                        entry.second.functionCalls,
                        entry.second.totalTime / entry.second.functionCalls,
                        entry.second.minTime,
                        entry.second.maxTime);
            }
        }
};
```

## Advanced Topics

```
// ----- MULTIPROCESSOR SUPPORT (SMP) -----
    // CPU detection and initialization
    // Inter-processor interrupts (IPIs)
    // Per-CPU data structures
    // CPU load balancing

class SMPManager {
    private:
        CPU* cpus;
        int numCPUs;

    public:
        void initializeCPUs() {
            // Detect available CPUs
            numCPUs = detectCPUCount();
            cpus = new CPU[numCPUs];

            // Start application processors
            for (int i = 1; i addressSpace->heapBase += randomOffset;
            process->addressSpace->stackBase += randomOffset;
        }

        bool verifyCodeSignature(const void* code, size_t size) {
            // Verify digital signature
            return cryptoVerify(code, size, publicKey);
        }
};

// ----- POWER MANAGEMENT -----
    // CPU frequency scaling
    // Device power states
    // Sleep and hibernation
    // Battery monitoring

class PowerManager {
    private:
        PowerState currentState;

    public:
        void setCPUFrequency(int percentage) {
            uint64_t msr = readMSR(IA32_PERF_CTL);
            msr = (msr & ~0xFFFF) | (percentage * 0xFFFF / 100);
            writeMSR(IA32_PERF_CTL, msr);
        }

        void enterSleepState(SleepState state) {
            // Save system state
            saveProcessorState();
            saveDeviceStates();

            // Enter sleep mode
            acpiEnterSleepState(state);
        }
};

// ----- VIRTUALIZATION SUPPORT -----
    // Hardware-assisted virtualization (Intel VT-x, AMD-V)
    // Hypervisor implementation
    // Guest operating system isolation
    // Virtual device interfaces

class Hypervisor {
    private:
        VirtualMachine* guests;
        int numGuests;

    public:
        VirtualMachine* createGuest() {
            VirtualMachine* guest = new VirtualMachine();

            // Set up VMCS (Virtual Machine Control Structure)
            setupVMCS(guest);

            // Configure virtual devices
            guest->virtualCPU = new VirtualCPU();
            guest->virtualMemory = new VirtualMemory();

            return guest;
        }

        void runGuest(VirtualMachine* guest) {
            // Enter guest mode
            vmlaunch(guest->vmcs);

            // Handle VM exits
            handleVMExit(guest);
        }
};
```

## More on

* [Operating Systems: Three Easy Pieces](https://pages.cs.wisc.edu/~remzi/OSTEP/) by Remzi H. Arpaci-Dusseau and Andrea C. Arpaci-Dusseau
* [Modern Operating Systems](https://csc-knu.github.io/sys-prog/books/Andrew%20S.%20Tanenbaum%20-%20Modern%20Operating%20Systems.pdf) by Andrew S. Tanenbaum
* [Operating System Concepts](https://codex.cs.yale.edu/avi/os-book/) by Abraham Silberschatz, Peter B. Galvin, and Greg Gagne
* [The Design and Implementation of the FreeBSD Operating System](https://www.freebsd.org/doc/en/books/design-44bsd/) by Marshall Kirk McKusick and George V. Neville-Neil
* [Linux Kernel Development](https://www.pearson.com/store/p/linux-kernel-development/P100000648849) by Robert Love
* [OSDev Wiki](https://wiki.osdev.org/) - Comprehensive OS development resource
* [Intel Software Developer Manuals](https://www.intel.com/content/www/us/en/developer/articles/technical/intel-sdm.html) - x86/x86_64 architecture reference
* [ARM Architecture Reference Manual](https://developer.arm.com/documentation/ddi0487/latest/) - ARM processor documentation
* [RISC-V Specifications](https://riscv.org/specifications/) - Open ISA specifications
* [Minix](https://www.minix3.org/) - Educational microkernel operating system
* [xv6](https://pdos.csail.mit.edu/6.828/2012/xv6.html) - Simple Unix-like teaching operating system
* [Bootlin Embedded Linux Courses](https://bootlin.com/training/embedded-linux/) - Linux kernel and embedded development
