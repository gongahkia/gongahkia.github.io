# Computer networking

# `Computer networking`

The practice of connecting computing devices to share resources and communicate across local and wide area networks.

## Introduction

* **Computer networking** enables communication between computing devices
* Fundamental to modern computing: internet, cloud services, distributed systems
* Involves hardware (routers, switches, cables) and software (protocols, applications)
* Spans from local connections to global internet infrastructure
* Enables resource sharing, data exchange, and collaborative computing

## Network Models

```
# ----- OSI MODEL (7 LAYERS) -----
    # Conceptual framework for understanding network communication
    # Each layer provides services to the layer above
    # Abstraction allows independent development of layer technologies

# LAYER 7: APPLICATION
    # User interface to network services
    # HTTP, HTTPS, FTP, SMTP, DNS, SSH protocols
    # Web browsers, email clients, file transfer applications

# LAYER 6: PRESENTATION  
    # Data formatting, encryption, compression
    # SSL/TLS encryption, JPEG, PNG, ASCII encoding
    # Character sets, data representation

# LAYER 5: SESSION
    # Establishes, manages, terminates connections
    # Session management, authentication, authorization  
    # NetBIOS, RPC, SQL sessions

# LAYER 4: TRANSPORT
    # End-to-end data delivery and error recovery
    # TCP (reliable) and UDP (unreliable) protocols
    # Port numbers, flow control, error detection

# LAYER 3: NETWORK
    # Routing between different networks
    # IP addressing, packet forwarding, path determination
    # IPv4, IPv6, ICMP, routing protocols (OSPF, BGP)

# LAYER 2: DATA LINK
    # Node-to-node delivery within same network segment
    # Frame formatting, error detection, MAC addressing
    # Ethernet, Wi-Fi, switches, bridges

# LAYER 1: PHYSICAL
    # Transmission of raw bits over physical medium
    # Cables, wireless signals, voltage levels, timing
    # Hubs, repeaters, network interface cards

# ----- TCP/IP MODEL (4 LAYERS) -----
    # Practical model used in internet implementation
    # Application => combines OSI layers 5-7
    # Transport => corresponds to OSI layer 4  
    # Internet => corresponds to OSI layer 3
    # Network Access => combines OSI layers 1-2
```

## Internet Protocol Suite

```
# ----- IP ADDRESSING -----

# IPv4 (32-BIT ADDRESSES)
    # Dotted decimal notation: 192.168.1.1
    # ~4.3 billion unique addresses (exhausted)
    # Classes: A (0.0.0.0-127.255.255.255), B, C
    # Private ranges: 10.x.x.x, 172.16-31.x.x, 192.168.x.x
    # CIDR notation: 192.168.1.0/24 (subnet mask)

# IPv6 (128-BIT ADDRESSES)
    # Hexadecimal notation: 2001:0db8:85a3:0000:0000:8a2e:0370:7334
    # ~340 undecillion addresses (virtually unlimited)
    # Link-local, unique local, and global unicast scopes
    # Auto-configuration and improved security features

# ----- TRANSPORT PROTOCOLS -----

# TCP (TRANSMISSION CONTROL PROTOCOL)
    # Connection-oriented, reliable delivery
    # Three-way handshake: SYN, SYN-ACK, ACK
    # Flow control, congestion control, error recovery
    # Sequence numbers ensure ordered delivery
    # Used by HTTP, HTTPS, FTP, SSH, email protocols

# UDP (USER DATAGRAM PROTOCOL)  
    # Connectionless, unreliable delivery
    # Lower overhead, faster transmission
    # No error recovery or flow control
    # Best-effort delivery with possible packet loss
    # Used by DNS, DHCP, streaming media, gaming

# ----- APPLICATION PROTOCOLS -----

# HTTP/HTTPS (WEB TRAFFIC)
    # HTTP => Hypertext Transfer Protocol (port 80)
    # HTTPS => HTTP over SSL/TLS (port 443)  
    # Request-response model: GET, POST, PUT, DELETE
    # Status codes: 200 OK, 404 Not Found, 500 Server Error

# DNS (DOMAIN NAME SYSTEM)
    # Translates domain names to IP addresses
    # Hierarchical distributed database
    # Root servers, TLD servers, authoritative servers
    # Query types: A (IPv4), AAAA (IPv6), MX (mail), CNAME (alias)

# FTP (FILE TRANSFER PROTOCOL)
    # Transfers files between client and server
    # Control connection (port 21) and data connection
    # Active vs passive modes for data transfer
    # SFTP and FTPS for secure file transfer
```

## Network Infrastructure

```
# ----- NETWORK DEVICES -----

# HUB (PHYSICAL LAYER)
    # Broadcasts data to all connected devices
    # Single collision domain (half-duplex communication)
    # Largely replaced by switches
    # Creates security and performance issues

# SWITCH (DATA LINK LAYER)
    # Learns MAC addresses and forwards frames intelligently
    # Each port is separate collision domain (full-duplex)
    # VLAN support for network segmentation
    # Spanning Tree Protocol prevents loops

# ROUTER (NETWORK LAYER)
    # Forwards packets between different networks
    # Maintains routing tables with path information
    # NAT (Network Address Translation) for private networks
    # Firewall capabilities and access control

# ----- WIRELESS NETWORKING -----

# Wi-Fi STANDARDS
    # 802.11n => up to 600 Mbps, 2.4/5 GHz bands
    # 802.11ac => up to 6.9 Gbps, 5 GHz band, MU-MIMO
    # 802.11ax (Wi-Fi 6) => up to 9.6 Gbps, OFDMA, better efficiency
    # WPA3 security protocol replaces WPA2

# CELLULAR NETWORKS
    # 4G LTE => up to 1 Gbps download speeds
    # 5G => up to 20 Gbps, ultra-low latency
    # Network slicing for different service requirements
    # Edge computing integration

# ----- NETWORK TOPOLOGIES -----
    # Star => central hub connects all devices
    # Mesh => every device connects to every other device
    # Ring => devices connected in circular fashion
    # Tree => hierarchical structure with root node
    # Hybrid => combination of different topologies
```

## Network Security

```
# ----- FIREWALL TYPES -----

# PACKET FILTERING FIREWALLS
    # Examine packets at network layer (Layer 3)
    # Allow/deny based on IP addresses, ports, protocols
    # Stateless: each packet evaluated independently
    # Fast but limited inspection capabilities

# STATEFUL FIREWALLS
    # Track connection state (TCP handshake status)
    # Make decisions based on connection context
    # More secure than packet filtering
    # Can detect connection hijacking attempts

# APPLICATION LAYER FIREWALLS
    # Deep packet inspection at application layer
    # Understand application protocols (HTTP, FTP, DNS)
    # Can block specific content or application features
    # Higher CPU overhead but better security

# ----- NETWORK ATTACKS -----

# MAN-IN-THE-MIDDLE (MITM)
    # Attacker intercepts communication between parties
    # ARP poisoning, DNS spoofing, rogue Wi-Fi hotspots
    # Prevention: encryption, certificate validation

# DDoS (DISTRIBUTED DENIAL OF SERVICE)
    # Overwhelming target with traffic from multiple sources
    # Volume attacks (UDP floods), protocol attacks (SYN flood)
    # Application layer attacks (HTTP floods)
    # Mitigation: rate limiting, traffic filtering, CDNs

# NETWORK SCANNING
    # Port scanning to find open services
    # Network reconnaissance and vulnerability discovery
    # Nmap tool for network discovery and security auditing
    # Defense: intrusion detection systems, port filtering

# ----- ENCRYPTION AND VPN -----

# SSL/TLS
    # Secure communication over insecure networks
    # Public key cryptography for key exchange
    # Symmetric encryption for data transfer
    # Certificate authorities validate server identity

# VPN (VIRTUAL PRIVATE NETWORK)
    # Secure tunnel over public networks
    # IPSec => network layer VPN protocol
    # OpenVPN => application layer VPN solution
    # Site-to-site and remote access VPN configurations
```

## Network Performance

```
# ----- PERFORMANCE METRICS -----

# BANDWIDTH
    # Maximum data transfer rate of network link
    # Measured in bits per second (bps, Kbps, Mbps, Gbps)
    # Theoretical vs actual throughput differences
    # Shared vs dedicated bandwidth considerations

# LATENCY
    # Time delay for data to travel from source to destination
    # Round-trip time (RTT) for bidirectional communication
    # Components: propagation, transmission, processing, queuing delays
    # Critical for real-time applications (VoIP, gaming, video conferencing)

# PACKET LOSS
    # Percentage of packets that fail to reach destination
    # Causes: network congestion, faulty equipment, interference
    # Impact on TCP (retransmission) vs UDP (lost data)
    # Quality of Service (QoS) mechanisms to minimize loss

# ----- QUALITY OF SERVICE (QoS) -----
    # Traffic prioritization and bandwidth allocation
    # Differentiated Services (DiffServ) markings
    # Traffic shaping and policing mechanisms
    # Service Level Agreements (SLAs) for performance guarantees

# ----- NETWORK OPTIMIZATION -----
    # Content Delivery Networks (CDNs) for geographic distribution
    # Caching at multiple network layers
    # Load balancing across multiple servers/paths
    # Traffic engineering and route optimization
    # Compression and protocol optimization techniques
```

## Network Troubleshooting

```
# ----- DIAGNOSTIC TOOLS -----

# PING
    # Tests connectivity and measures round-trip time
    # Uses ICMP Echo Request/Reply messages
    # Basic connectivity verification and latency measurement
    # Limitations: firewalls may block ICMP traffic

# TRACEROUTE
    # Maps network path from source to destination
    # Shows each hop (router) along the path
    # Identifies where connectivity issues occur
    # TTL manipulation to discover intermediate routers

# NETSTAT
    # Displays active network connections and listening ports
    # Shows routing table and interface statistics
    # Useful for detecting unauthorized connections
    # Cross-platform availability with similar functionality

# WIRESHARK
    # Network protocol analyzer for packet capture
    # Deep inspection of network traffic
    # Filters for specific protocols, addresses, ports
    # Essential for advanced network troubleshooting

# ----- COMMON ISSUES -----
    # IP address conflicts within same network segment
    # DNS resolution failures preventing name-to-IP translation
    # Routing table misconfigurations causing packet loss
    # MTU size mismatches causing fragmentation issues
    # Network congestion leading to performance degradation
    # Hardware failures in switches, routers, cables
```

## Emerging Technologies

```
# ----- SOFTWARE DEFINED NETWORKING (SDN) -----
    # Separation of control plane from data plane
    # Centralized network control and programmability
    # OpenFlow protocol for switch-controller communication
    # Network Function Virtualization (NFV)
    # Dynamic network configuration and automation

# ----- EDGE COMPUTING -----
    # Processing data closer to source (edge of network)
    # Reduced latency for time-sensitive applications
    # Bandwidth optimization by local processing
    # IoT device support and real-time analytics
    # 5G network integration for ultra-low latency

# ----- INTENT-BASED NETWORKING -----
    # High-level policy specification instead of device configuration
    # AI/ML for network optimization and anomaly detection
    # Automated network provisioning and management  
    # Self-healing networks with automatic issue resolution

# ----- IPv6 TRANSITION -----
    # Dual-stack networks running both IPv4 and IPv6
    # Tunneling mechanisms for IPv6 over IPv4 networks
    # Network Address Translation (NAT64) for protocol translation
    # Long-term migration strategies and considerations
```

## More on

* [Computer Networks](https://www.pearson.com/store/p/computer-networks/P100000648863) by Andrew S. Tanenbaum and David J. Wetherall
* [TCP/IP Illustrated](https://www.informit.com/series/series_detail.aspx?ser=2100501) by W. Richard Stevens
* [Network+](https://www.comptia.org/certifications/network) CompTIA certification and study materials
* [Cisco Networking Academy](https://www.netacad.com/) - CCNA certification and courses
* [RFC Editor](https://www.rfc-editor.org/) - Internet standards and protocols documentation
* [Wireshark University](https://www.wireshark.org/docs/) - Network analysis tutorials and documentation
* [Internet2](https://www.internet2.edu/) - Advanced networking research and education
* [IEEE 802 Standards](https://www.ieee802.org/) - LAN/MAN standards committee
* [IANA](https://www.iana.org/) - Internet Assigned Numbers Authority
* [Cloudflare Learning](https://www.cloudflare.com/learning/) - Networking and internet security concepts
