# Cybersecurity Overview

# `Cybersecurity Overview`

## Definitions

* Data lifecycle: stages that data goes through from creation to deletion or archiving *(generation, collection, processing, storage, management, analysis, visualization, interpretation)*
* Data integrity: assurance that data is accurate, complete, consistent and uncorrupted throughout its lifecycle
* Data confidentiality: ensuring data is protected from unauthorized access and disclosure
* Encryption: Conversion of readable information to an unreadable format using an algorithm and key, used to ensure data confidentiality
* Hashing: One-way mathematical function that irreversibly transforms data to a fixed-size character string, used to ensure data integrity
* Red team: Group that acts as malicious actors, simulating real-world attacks that identify and exploit vulnerabilities in an organization's defenses
* Blue team: Group that acts as the targetted organisation, defending their systems and networks against the Red team's attacks
* Purple team: Group that acts as both the Red and Blue team, improving an organisation's security posture with offensive and defensive measures
* Pentesting: A.K.A penetration testing, a simulated cyber attack by ethical hackers to evaluate an organisation's system vulnerabilities and security posture

## Cyber attacks

There are 7 main types of cyber attacks.

1. [Phishing](#phishing-)
2. [Malware](#malware-)
3. [DoS](#denial-of-service-)
4. [Identity-Based attacks](#identity-based-attacks-)
5. [Code injection](#code-injection-)
6. [MitM attacks](#man-in-the-middle-attacks-)
7. [Supply chain attacks](#supply-chain-attacks-)

```mermaid
flowchart TD;
    A[Cyber Attacks] --> B[Phishing Attacks 🎣]
    A --> C[Malware Attacks 💻]
    A --> D[Denial of Service Attacks ⛔]
    A --> E[Identity-Based Attacks 🧟]
    A --> F[Code Injection Attacks 💉]
    A --> G[Man-in-the-Middle Attacks 🖕]
    A --> H[Supply Chain Attacks 🚚]
    B --> J[Spear Phishing]
    B --> K[Whaling]
    B --> L[Vishing]
    B --> M[Smishing]
    C --> N[Viruses]
    C --> O[Worms]
    C --> P[Trojan Horses]
    C --> Q[Ransomware]
    D --> R[DoS]
    D --> S[DDoS]
    D --> T[Application Layer Attacks]
    E --> U[Credential Harvesting]
    E --> V[Business Email Compromise]
    F --> W[SQL Injection]
    F --> X[Cross-Site Scripting]
    G --> Y[Rogue Access Points]
    G --> Z[Eavesdropping]
    H
```

### Phishing 🎣

Malicious actors trick individuals into revealing SENSITIVE information by impersonating as a trustworthy entity.

Specific variants include

1. SPEAR PHISHING: Targeted phishing aimed at specific individuals or organizations.
2. WHALING: A type of spear phishing that targets high-profile individuals like executives.
3. VISHING: Voice phishing conducted through phone calls.
4. SMISHI: Phishing via SMS messages.

### Malware 💻

Malicious software that harms devices or networks.

Specific variants include

1. VIRUSES: Self-replicating programs that spread to other systems.
2. WORMS: Viruses that do not require human interaction to spread.
3. TROJAN HORSES: Malicious software disguised as legitimate applications.
4. RANSOMWARE: Encrypts data and demands payment for decryption.

### Denial of Service ⛔

* A.K.A DoS.
* Make a service unavailable by overwhelming it with traffic.

Specific variants include

1. DISTRIBUTED DENIAL OF SERVICE: A.K.A DDoS. Uses multiple compromised systems to launch an attack.
2. APPLICATION LAYER ATTACKS: Targets specific applications to exploit vulnerabilities.

### Identity-Based attacks 🧟

Stealing personal information to gain unauthorized access.

1. CREDENTIAL HARVESTING: Malicious actors collect login credentials en masse.
2. BUSINESS EMAIL COMPROMISE: A.K.A BEC. Involves impersonating a trusted source to deceive customers or employees into transferring funds or data.

### Code Injection 💉

Feeding programs malicious code to manipulate data and execute unauthorized commands.

1. SQL INJECTION: Inserting malicious SQL queries through input fields.
2. CROSS-SITE SCRIPTING: A.K.A XSS. Injecting scripts into web pages viewed by users.

### Man-in-the-Middle attacks 🖕

* A.K.A MitM attacks.
* Malicious actors intercept and alter communication between two parties without their knowledge.

Typically arises from

1. ROGUE ACCESS POINTS mimicking legitimate networks, created by the malicious actors.
2. EAVESDROPPING on existing unsecured connections.

### Supply Chain attacks 🚚

* Exploit supply chain vulnerabilities.
* Can target both SOFTWARE and HARDWARE components.

## Securing data

The 2 main methods to secure data are [encryption](#encryption) and [hashing](#hashing).

### Overview

**Encryption**

* Susceptible to COMPROMISED KEYS due to poor management
* Susceptible to WEAK ENCRYPTION ALGORITHMS
* Commonly used for data confidentiality IN TRANSIT (during communication) and AT REST (storage)

**Hashing**

* Susceptible to COLLISION ATTACKS where different data inputs produce the same hash value
* Susceptible to BRUTE-FORCE ATTACKS if weak hash functions are used
* Commonly used for data integrity checks

### Encryption

> [!TIP]  
> Remember to run `pip install pycryptodome` to run the worked examples below.

#### Symmetric Encryption

* Relies on ONE key for encryption and decryption
* Sender and receiver must both have the key
* Typically fast
* More efficient for encrypting large volumes of data
* Requires secure key management
* Used to protect data from being read by unwanted actors
* REVERSIBLE since encryption is a TWO-WAY process

```mermaid
sequenceDiagram
    participant Sender
    participant Receiver
    participant Key Generator

    Sender->>Key Generator: Generate shared secret key
    Key Generator-->>Sender: Provide key
    Key Generator-->>Receiver: Provide key
    Sender->>Sender: Encrypt data using key
    Sender->>Receiver: Send encrypted data
    Receiver->>Receiver: Decrypt data using key
```

<table>
<tr>
<th>Encryption method</th>
<th>Requirements</th>
<th>Characteristics</th>
<th>Python implementation</th>
</tr>
<tr>
<td>AES</td>
<td>Shared secret key</td>
<td>Fast, secure, supports key sizes of 128, 192, or 256 bits</td>
<td>
<div class="codehilite"><pre><span></span><code><span class="kn">from</span><span class="w"> </span><span class="nn">Crypto.Cipher</span><span class="w"> </span><span class="kn">import</span> <span class="n">AES</span>
<span class="kn">from</span><span class="w"> </span><span class="nn">Crypto.Util.Padding</span><span class="w"> </span><span class="kn">import</span> <span class="n">pad</span><span class="p">,</span> <span class="n">unpad</span>

<span class="n">key</span> <span class="o">=</span> <span class="sa">b</span><span class="s1">'Sixteen byte key'</span>
<span class="n">cipher</span> <span class="o">=</span> <span class="n">AES</span><span class="o">.</span><span class="n">new</span><span class="p">(</span><span class="n">key</span><span class="p">,</span> <span class="n">AES</span><span class="o">.</span><span class="n">MODE_CBC</span><span class="p">)</span>
<span class="n">ct_bytes</span> <span class="o">=</span> <span class="n">cipher</span><span class="o">.</span><span class="n">encrypt</span><span class="p">(</span><span class="n">pad</span><span class="p">(</span><span class="n">data</span><span class="p">,</span> <span class="n">AES</span><span class="o">.</span><span class="n">block_size</span><span class="p">))</span>
</code></pre></div>
</td>
</tr>
<tr>
<td>DES</td>
<td>Shared secret key</td>
<td>56-bit key, considered weak due to vulnerabilities</td>
<td>
<div class="codehilite"><pre><span></span><code><span class="kn">from</span><span class="w"> </span><span class="nn">Crypto.Cipher</span><span class="w"> </span><span class="kn">import</span> <span class="n">DES</span>
<span class="kn">from</span><span class="w"> </span><span class="nn">Crypto.Util.Padding</span><span class="w"> </span><span class="kn">import</span> <span class="n">pad</span><span class="p">,</span> <span class="n">unpad</span>

<span class="n">key</span> <span class="o">=</span> <span class="sa">b</span><span class="s1">'8bytekey'</span>
<span class="n">cipher</span> <span class="o">=</span> <span class="n">DES</span><span class="o">.</span><span class="n">new</span><span class="p">(</span><span class="n">key</span><span class="p">,</span> <span class="n">DES</span><span class="o">.</span><span class="n">MODE_CBC</span><span class="p">)</span>
<span class="n">cipher</span><span class="o">.</span><span class="n">encrypt</span><span class="p">(</span><span class="n">pad</span><span class="p">(</span><span class="n">data</span><span class="p">,</span> <span class="n">DES</span><span class="o">.</span><span class="n">block_size</span><span class="p">))</span>
</code></pre></div>
</td>
</tr>
<tr>
<td>3DES</td>
<td>Shared secret key</td>
<td>Applies DES three times for enhanced security</td>
<td>
<div class="codehilite"><pre><span></span><code><span class="kn">from</span><span class="w"> </span><span class="nn">Crypto.Cipher</span><span class="w"> </span><span class="kn">import</span> <span class="n">DES3</span>
<span class="kn">from</span><span class="w"> </span><span class="nn">Crypto.Util.Padding</span><span class="w"> </span><span class="kn">import</span> <span class="n">pad</span><span class="p">,</span> <span class="n">unpad</span>

<span class="n">key</span> <span class="o">=</span> <span class="sa">b</span><span class="s1">'16bytekey12345'</span>
<span class="n">cipher</span> <span class="o">=</span> <span class="n">DES3</span><span class="o">.</span><span class="n">new</span><span class="p">(</span><span class="n">key</span><span class="p">,</span> <span class="n">DES3</span><span class="o">.</span><span class="n">MODE_CBC</span><span class="p">)</span>
<span class="n">ct_bytes</span> <span class="o">=</span> <span class="n">cipher</span><span class="o">.</span><span class="n">encrypt</span><span class="p">(</span><span class="n">pad</span><span class="p">(</span><span class="n">data</span><span class="p">,</span> <span class="n">DES3</span><span class="o">.</span><span class="n">block_size</span><span class="p">))</span>
</code></pre></div>
</td>
</tr>
<tr>
<td>RC4</td>
<td>Shared secret key</td>
<td>Stream cipher, fast but not recommended for secure use</td>
<td>
<div class="codehilite"><pre><span></span><code><span class="kn">from</span><span class="w"> </span><span class="nn">Crypto.Cipher</span><span class="w"> </span><span class="kn">import</span> <span class="n">ARC4</span>

<span class="n">key</span> <span class="o">=</span> <span class="sa">b</span><span class="s1">'SecretKey'</span>
<span class="n">cipher</span> <span class="o">=</span> <span class="n">ARC4</span><span class="o">.</span><span class="n">new</span><span class="p">(</span><span class="n">key</span><span class="p">)</span>
<span class="n">ct_bytes</span> <span class="o">=</span> <span class="n">cipher</span><span class="o">.</span><span class="n">encrypt</span><span class="p">(</span><span class="n">data</span><span class="p">)</span>
</code></pre></div>
</td>
</tr>
</table>

#### Asymmetric Encryption

* Relies on TWO keys
  * PUBLIC key for encryption
  * PRIVATE key for decryption
* Sender has their own public and private key pair
  * encrypts messages with the RECEIVER's public key
  * decryptes messages with their private key
* Receiver has their own public and private key pair
  * decrypts messages with their private key
  * encrypts messages with the SENDER's public key
* Each party's PUBLIC keys are made known to the other, their PRIVATE keys are kept secret
* Typically slower than symmetric encryption
* More secure for encrypting small volumes of data
* Allows secure communication without sharing private key
* Used to protect data from being read by unwanted actors
* REVERSIBLE since encryption is a TWO-WAY process

```mermaid
sequenceDiagram
    participant Sender
    participant Receiver
    participant Sender Key Generator
    participant Receiver Key Generator

    Sender->>Sender Key Generator: Generate public and private key
    Sender Key Generator-->>Sender: Provide keys
    Receiver->>Receiver Key Generator: Generate public and private key
    Receiver Key Generator-->>Receiver: Provide keys
    Receiver->>Sender: Send public key
    Sender->>Receiver: Send public key
    Sender->>Sender: Encrypt data using recepient's public key
    Sender->>Receiver: Send encrypted data
    Receiver->>Receiver: Decrypt data using their own private key
```

<table>
<tr>
<th>Encryption method</th>
<th>Requirements</th>
<th>Characteristics</th>
<th>Python implementation</th>
</tr>
<tr>
<td>RSA</td>
<td>Public and private key pair</td>
<td>Uses large prime numbers for security</td>
<td>
<div class="codehilite"><pre><span></span><code><span class="kn">from</span><span class="w"> </span><span class="nn">Crypto.PublicKey</span><span class="w"> </span><span class="kn">import</span> <span class="n">RSA</span>

<span class="n">key</span> <span class="o">=</span> <span class="n">RSA</span><span class="o">.</span><span class="n">generate</span><span class="p">(</span><span class="mi">2048</span><span class="p">)</span>
<span class="n">private_key</span> <span class="o">=</span> <span class="n">key</span><span class="o">.</span><span class="n">export_key</span><span class="p">()</span>
<span class="n">public_key</span> <span class="o">=</span> <span class="n">key</span><span class="o">.</span><span class="n">publickey</span><span class="p">()</span><span class="o">.</span><span class="n">export_key</span><span class="p">()</span>
</code></pre></div>
</td>
</tr>
<tr>
<td>ECC</td>
<td>Public and private key pair</td>
<td>Shorter keys with strong security</td>
<td>
<div class="codehilite"><pre><span></span><code><span class="kn">from</span><span class="w"> </span><span class="nn">Crypto.PublicKey</span><span class="w"> </span><span class="kn">import</span> <span class="n">ECC</span>

<span class="n">key</span> <span class="o">=</span> <span class="n">ECC</span><span class="o">.</span><span class="n">generate</span><span class="p">(</span><span class="n">curve</span><span class="o">=</span><span class="s1">'P-256'</span><span class="p">)</span>
<span class="n">private_key</span> <span class="o">=</span> <span class="n">key</span><span class="o">.</span><span class="n">export_key</span><span class="p">(</span><span class="nb">format</span><span class="o">=</span><span class="s1">'PEM'</span><span class="p">)</span>
<span class="n">public_key</span> <span class="o">=</span> <span class="n">key</span><span class="o">.</span><span class="n">public_key</span><span class="p">()</span><span class="o">.</span><span class="n">export_key</span><span class="p">(</span><span class="nb">format</span><span class="o">=</span><span class="s1">'PEM'</span><span class="p">)</span>
</code></pre></div>
</td>
</tr>
<tr>
<td>DSA</td>
<td>Public and private key pair</td>
<td>Used for digital signatures</td>
<td>
<div class="codehilite"><pre><span></span><code><span class="kn">from</span><span class="w"> </span><span class="nn">Crypto.PublicKey</span><span class="w"> </span><span class="kn">import</span> <span class="n">DSA</span>

<span class="n">key</span> <span class="o">=</span> <span class="n">DSA</span><span class="o">.</span><span class="n">generate</span><span class="p">(</span><span class="mi">2048</span><span class="p">)</span>
<span class="n">private_key</span> <span class="o">=</span> <span class="n">key</span><span class="o">.</span><span class="n">export_key</span><span class="p">()</span>
<span class="n">public_key</span> <span class="o">=</span> <span class="n">key</span><span class="o">.</span><span class="n">publickey</span><span class="p">()</span><span class="o">.</span><span class="n">export_key</span><span class="p">()</span>
</code></pre></div>
</td>
</tr>
</table>

### Hashing

* Relies on HASH functions to map input data to a fixed-size hash value (message digest)
* Sender and receiver must BOTH ensure data integrity by computing and comparing the hash values based off their data
* Data is intact if hash values MATCH
* Typically faster than both symmetric and asymmetric encryption
* Requires collision management since hash functions can produce the SAME hash value for different inputs
* Used to verify if data has been altered during transit
* IRREVERSIBLE since hashing is a ONE-WAY function

```mermaid
sequenceDiagram
    participant Sender
    participant Receiver
    participant Hash Function

    Sender->>Hash Function: Input data
    Hash Function-->>Sender: Generate hash value 
    Sender->>Receiver: Send input data and hash value
    Receiver->>Hash Function: Input data
    Hash Function-->>Receiver: Generate hash value
    Receiver->>Receiver: Compare received hash with generated hash
```

<table>
<tr>
<th>Hashing method</th>
<th>Requirements</th>
<th>Characteristics</th>
<th>Python implementation</th>
</tr>
<tr>
<td>MD5</td>
<td>No special requirements</td>
<td>Produces a 128-bit hash, fast but vulnerable to collisions</td>
<td>
<div class="codehilite"><pre><span></span><code><span class="kn">import</span><span class="w"> </span><span class="nn">hashlib</span>

<span class="nb">hash</span> <span class="o">=</span> <span class="n">hashlib</span><span class="o">.</span><span class="n">md5</span><span class="p">(</span><span class="n">data</span><span class="o">.</span><span class="n">encode</span><span class="p">())</span><span class="o">.</span><span class="n">hexdigest</span><span class="p">()</span>
</code></pre></div>
</td>
</tr>
<tr>
<td>SHA-1</td>
<td>No special requirements</td>
<td>Produces a 160-bit hash, faster than SHA-2 but less secure</td>
<td>
<div class="codehilite"><pre><span></span><code><span class="kn">import</span><span class="w"> </span><span class="nn">hashlib</span>

<span class="nb">hash</span> <span class="o">=</span> <span class="n">hashlib</span><span class="o">.</span><span class="n">sha1</span><span class="p">(</span><span class="n">data</span><span class="o">.</span><span class="n">encode</span><span class="p">())</span><span class="o">.</span><span class="n">hexdigest</span><span class="p">()</span>
</code></pre></div>
</td></tr>
<tr>
<td>SHA-256</td>
<td>No special requirements</td>
<td>Part of the SHA-2 family, produces a 256-bit hash, widely used for security</td>
<td>
<div class="codehilite"><pre><span></span><code><span class="kn">import</span><span class="w"> </span><span class="nn">hashlib</span>

<span class="nb">hash</span> <span class="o">=</span> <span class="n">hashlib</span><span class="o">.</span><span class="n">sha256</span><span class="p">(</span><span class="n">data</span><span class="o">.</span><span class="n">encode</span><span class="p">())</span><span class="o">.</span><span class="n">hexdigest</span><span class="p">()</span>
</code></pre></div>
</td>
</tr>
<tr>
<td>BLAKE2</td>
<td>No special requirements</td>
<td>Faster than MD5 and SHA-2, customizable output size</td>
<td>
<div class="codehilite"><pre><span></span><code><span class="kn">import</span><span class="w"> </span><span class="nn">hashlib</span>

<span class="nb">hash</span> <span class="o">=</span> <span class="n">hashlib</span><span class="o">.</span><span class="n">blake2b</span><span class="p">(</span><span class="n">data</span><span class="o">.</span><span class="n">encode</span><span class="p">())</span><span class="o">.</span><span class="n">hexdigest</span><span class="p">()</span>
</code></pre></div>
</td>
</tr>
<tr>
<td>RIPEMD-160</td>
<td>No special requirements</td>
<td>Produces a 160-bit hash, designed for cryptographic security</td>
<td>
<div class="codehilite"><pre><span></span><code><span class="kn">import</span><span class="w"> </span><span class="nn">hashlib</span>

<span class="nb">hash</span> <span class="o">=</span> <span class="n">hashlib</span><span class="o">.</span><span class="n">new</span><span class="p">(</span><span class="s1">'ripemd160'</span><span class="p">,</span> <span class="n">data</span><span class="o">.</span><span class="n">encode</span><span class="p">())</span><span class="o">.</span><span class="n">hexdigest</span><span class="p">()</span>
</code></pre></div>
</td>
</tr>
<tr>
<td>Scrypt</td>
<td>No special requirements</td>
<td>Password hashing function designed to be computationally intensive</td>
<td>
<div class="codehilite"><pre><span></span><code><span class="kn">from</span><span class="w"> </span><span class="nn">passlib.hash</span><span class="w"> </span><span class="kn">import</span> <span class="n">scrypt</span>

<span class="nb">hash</span> <span class="o">=</span> <span class="n">scrypt</span><span class="o">.</span><span class="n">using</span><span class="p">(</span><span class="n">salt</span><span class="o">=</span><span class="sa">b</span><span class="s1">'salt'</span><span class="p">)</span><span class="o">.</span><span class="n">hash</span><span class="p">(</span><span class="n">data</span><span class="p">)</span>
</code></pre></div>
</td>
</tr>
<tr>
<td>Bcrypt</td>
<td>No special requirements</td>
<td>Password hashing function with built-in salting and adjustable cost factor</td>
<td>
<div class="codehilite"><pre><span></span><code><span class="kn">from</span><span class="w"> </span><span class="nn">passlib.hash</span><span class="w"> </span><span class="kn">import</span> <span class="n">bcrypt</span>

<span class="nb">hash</span> <span class="o">=</span> <span class="n">bcrypt</span><span class="o">.</span><span class="n">hash</span><span class="p">(</span><span class="n">data</span><span class="p">)</span>
</code></pre></div>
</td>
</tr>
<tr>
<td>Argon2</td>
<td>No special requirements</td>
<td>Password hashing function that won the Password Hashing Competition (PHC)</td>
<td>
<div class="codehilite"><pre><span></span><code><span class="kn">from</span><span class="w"> </span><span class="nn">argon2</span><span class="w"> </span><span class="kn">import</span> <span class="n">PasswordHasher</span>

<span class="n">ph</span> <span class="o">=</span> <span class="n">PasswordHasher</span><span class="p">()</span>
<span class="nb">hash</span> <span class="o">=</span> <span class="n">ph</span><span class="o">.</span><span class="n">hash</span><span class="p">(</span><span class="n">data</span><span class="p">)</span>
</code></pre></div>
</td>
</tr>
</table>

## More on

* [*The Pigeonhole Principle*](https://www.baeldung.com/cs/pigeonhole-principle) by baeldung
* [*Cryptographic Attacks*](https://www.codecademy.com/article/cryptographic-attacks) by Codecademy
* [*Types Of Cyber Attacks*](https://www.fortinet.com/resources/cyberglossary/types-of-cyber-attacks) by Fortinet
* [*Friendly Intro to Hardware Security Modules (HSMs)*](https://youtu.be/uewhaNg1BhE?feature=shared) by Studying With Alex
* [*Intro to Encryption, in Friendly Terms: Cryptography, AES, Man In The Middle, and HTTPS*](https://youtu.be/AXkRoFOP-ug?feature=shared) by Studying With Alex
* [*Password Storage Tier List: encryption, hashing, salting, bcrypt, and beyond*](https://youtu.be/qgpsIBLvrGY?feature=shared) by Studying With Alex
* [*Get Started in Cybersecurity 2025 (A Guide)*](https://youtu.be/UoHSVHF-GUE?feature=shared) by Grant Collins
* [*Guide to becoming a Cyber Security Expert*](https://roadmap.sh/cyber-security) by roadmap.sh