export interface Article {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  readTime: string;
  publishedAt: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  summary: string;
  content: string[];
  tags: string[];
}

export const ARTICLES: Article[] = [
  {
    slug: 'scalable-microservices-nodejs-golang',
    title: 'Architecting Scalable Microservices with Node.js and Golang',
    subtitle: 'A practical deep dive into hybrid microservice architectures, concurrency patterns, and asynchronous messaging.',
    category: 'Backend Architecture',
    readTime: '7 min read',
    publishedAt: 'February 2026',
    author: {
      name: 'Jit Maiti',
      role: 'Full-Stack & Systems Engineer',
      avatar: 'JM',
    },
    summary: 'When designing distributed systems that need to process hundreds of thousands of requests per second with sub-millisecond response times, selecting the right tool for each microservice boundary is critical. This guide explores the architectural synergy between Node.js and Golang.',
    tags: ['Node.js', 'Golang', 'Microservices', 'Distributed Systems', 'Docker', 'Redis'],
    content: [
      'In modern distributed backend systems, a monolithic architecture often gives way to specialized services where polyglot programming shines. Node.js excels at rapid I/O aggregation, GraphQL gateways, and dynamic API endpoints, while Golang provides raw computational speed, low memory overhead, and first-class concurrency via goroutines.',
      '## 1. Domain Decomposition and Service Boundaries',
      'The key to successful microservices lies in identifying strict domain boundaries using Domain-Driven Design (DDD). Services should own their data models and communicate primarily through asynchronous event brokers (such as RabbitMQ, Kafka, or Redis Streams) rather than tightly coupled synchronous HTTP endpoints.',
      'In our architecture, we place a lightweight Node.js/TypeScript gateway at the ingress layer. The gateway handles JWT authentication, payload validation via Zod, rate limiting, and response stitching. Downstream computational workloads—such as cryptographic verification, data serialization, and geospatial routing—are delegated to Golang microservices via gRPC over HTTP/2.',
      '## 2. Concurrency: Event Loop vs. Goroutines',
      'Node.js operates on a single-threaded event loop powered by libuv. This makes it exceptionally fast for I/O-bound tasks where threads would otherwise spend CPU cycles waiting for database queries or third-party webhooks. However, CPU-heavy tasks can block the event loop, causing latency spikes across all concurrent users.',
      'Golang, in contrast, implements an M:N scheduler that maps thousands of lightweight goroutines onto native OS threads. A goroutine starts with only 2KB of stack space, compared to 1MB–2MB for an OS thread. By implementing channel-based communication (CSP pattern) in Go, we eliminate shared mutable memory hazards without complex mutex locks.',
      '## 3. Asynchronous Resiliency and Fault Tolerance',
      'Distributed systems will experience network partitions and hardware failures. To build resilience into our services, we incorporate several critical patterns:',
      '- **Circuit Breakers**: When downstream microservices fail, the circuit breaker trips, failing fast and returning cached responses rather than allowing requests to pile up and exhaust connections.',
      '- **Distributed Tracing**: OpenTelemetry traces are propagated across HTTP and gRPC boundaries using trace headers (`traceparent`), allowing visualization of latency bottlenecks across service hops.',
      '- **Exponential Backoff and Jitter**: Retries without randomized jitter cause the "thundering herd" problem. Adding jitter smooths retry spikes and prevents database denial of service.',
      '## 4. Conclusion',
      'Pairing Node.js at the developer-facing gateway layer with Golang at the performance-critical data pipeline layer delivers both rapid feature iteration and enterprise-grade scalability. Understanding the trade-offs of runtime models is what separates fragile systems from resilient production backends.'
    ]
  },
  {
    slug: 'production-flutter-engineering',
    title: 'Production Flutter Engineering: Architecture, State Management, and 120Hz Performance',
    subtitle: 'Best practices for building large-scale Flutter applications that maintain consistent 60fps and 120fps refresh rates on iOS and Android.',
    category: 'Mobile Development',
    readTime: '8 min read',
    publishedAt: 'January 2026',
    author: {
      name: 'Jit Maiti',
      role: 'Full-Stack & Mobile Engineer',
      avatar: 'JM',
    },
    summary: 'Flutter allows engineers to write cross-platform mobile apps with a single codebase, but achieving truly native-feeling 120fps performance requires deep knowledge of the Impeller rendering engine, widget tree reconstruction, and reactive state management.',
    tags: ['Flutter', 'Dart', 'Mobile Architecture', 'iOS', 'Android', 'Performance'],
    content: [
      'Creating production Flutter applications that feel indistinguishable from natively built iOS and Android apps requires disciplined architecture. Rather than relying on simple stateful widgets, scalable mobile applications enforce strict unidirectional data flow and isolate business logic from presentation.',
      '## 1. Clean Layered Architecture for Flutter',
      'We structure production Flutter codebases into three decoupled layers:',
      '- **Data Layer**: Repositories, HTTP REST clients (using `dio` or `http`), local caching via SQLite/Isar, and JSON serialization with code generation (`freezed` or `json_serializable`).',
      '- **Domain Layer**: Pure Dart entity models and use cases (business logic) completely free of any Flutter framework dependencies.',
      '- **Presentation Layer**: Widgets, state notifiers, and UI components that observe immutable state streams and react to events.',
      '## 2. State Management: Bloc vs. Riverpod',
      'Predictable state management prevents catastrophic full-screen widget rebuilds. In enterprise systems, Riverpod and BLoC (Business Logic Component) are the gold standards. Both ensure:',
      '1. State transitions are deterministic and testable.',
      '2. Widgets rebuild only when the specific piece of state they depend on changes (using `select` or scoped consumers).',
      '3. Dependency injection is compile-safe and decoupled from the `BuildContext` widget tree.',
      '## 3. Eliminating Jank: 120Hz Refresh Rate Optimization',
      'To achieve smooth 60fps/120fps animations on ProMotion and modern Android displays, developers must minimize rasterization overhead:',
      '- **Use const constructors aggressively**: Tagging widgets with `const` allows Flutter to short-circuit rebuild cycles and reuse existing widget instances in memory.',
      '- **Offscreen Render Avoidance**: Avoid using `Opacity` and `ClipRRect` inside scrolling lists unless necessary, as both force the Impeller/Skia engine to allocate offscreen save-layers, consuming GPU memory bandwidth.',
      '- **Isolates for Heavy Parsing**: Large JSON payloads (such as 1MB+ geospatial route data or batch sync responses) should always be parsed inside a background `Isolate` using `compute()` to prevent freezing the main UI thread.',
      '## 4. Conclusion',
      'By adhering to clean architectural boundaries, leveraging reactive state management, and respecting the rendering pipeline, Flutter apps can exceed native performance benchmarks while halving development overhead.'
    ]
  },
  {
    slug: 'designing-autonomous-ai-agents',
    title: 'Designing Autonomous AI Agents: Workflow Decomposition and LLM Orchestration',
    subtitle: 'How to build deterministic, tool-calling AI agents with structured JSON outputs, working memory, and error recovery.',
    category: 'Artificial Intelligence',
    readTime: '9 min read',
    publishedAt: 'February 2026',
    author: {
      name: 'Jit Maiti',
      role: 'AI & Systems Engineer',
      avatar: 'JM',
    },
    summary: 'Moving beyond simple single-turn chatbot prompts, autonomous AI agents operate through reasoning loops: observing system state, decomposing goals into sub-tasks, calling external APIs, and iteratively validating outputs.',
    tags: ['AI Agents', 'LLMs', 'Python', 'System Architecture', 'Prompt Engineering'],
    content: [
      'The modern frontier of generative AI is not just generating text—it is orchestrating autonomous agents capable of performing multi-step reasoning, interacting with external databases, executing code, and recovering from runtime errors without human intervention.',
      '## 1. The Core Agent Architecture: ReAct and Plan-and-Solve',
      'Most production agents implement variants of the ReAct (Reasoning + Acting) or Plan-and-Solve frameworks:',
      '1. **Thought**: The LLM analyzes the user prompt and the current state of its scratchpad memory.',
      '2. **Action**: The agent selects a specific tool from its registry (e.g., database query, web search, code executor) and formats a structured JSON payload.',
      '3. **Observation**: The host application executes the tool and injects the output back into the conversation context.',
      '4. **Evaluation**: The agent verifies if the observation satisfies the current sub-goal or requires corrective action.',
      '## 2. Guardrails, Type Safety, and Structured Tool Calling',
      'Relying on raw markdown outputs causes frequent parser crashes. In our architectures, every tool input and output schema is strictly defined using Pydantic (in Python) or Zod (in TypeScript).',
      'By forcing the LLM to adhere to strict JSON schemas (using function calling or constrained decoding), we ensure that database mutations and API calls are validated before execution. If a tool call fails, the exact validation error is fed back into the context, allowing the agent to self-correct its parameters.',
      '## 3. Managing Agent Context and Working Memory',
      'LLM context windows are finite and costly. Unconstrained multi-turn conversations degrade performance and increase token costs. Effective memory management requires a multi-tiered approach:',
      '- **Short-term Memory**: The active execution scratchpad containing the current task and immediate tool outputs.',
      '- **Long-term Memory**: Vector embeddings stored in a vector database (such as Milvus, pgvector, or Pinecone), allowing semantic retrieval of past conversation history and relevant documentation.',
      '- **Summarization Hooks**: When the active context approaches a threshold (e.g., 8,000 tokens), an auxiliary summarizer condenses completed milestones into concise bullet points.',
      '## 4. Conclusion',
      'Autonomous agents are transitioning from experimental toys into production enterprise software. Engineering reliability into agents requires treating prompt engineering as systems engineering: enforcing strict schemas, building sandboxed execution environments, and implementing robust error recovery loops.'
    ]
  },
  {
    slug: 'fullstack-web-performance-guide',
    title: 'Full-Stack Web Performance: Core Web Vitals, Rendering Pipelines, and DB Indexing',
    subtitle: 'A comprehensive technical manual for optimizing Largest Contentful Paint (LCP), Interaction to Next Paint (INP), and backend query latency.',
    category: 'Performance Engineering',
    readTime: '6 min read',
    publishedAt: 'January 2026',
    author: {
      name: 'Jit Maiti',
      role: 'Full-Stack Engineer',
      avatar: 'JM',
    },
    summary: 'A fast web experience is not an accident—it is the result of systematic performance engineering across the entire stack, from CSS compositing and client bundle splitting down to database execution plans.',
    tags: ['Web Performance', 'Core Web Vitals', 'PostgreSQL', 'CSS', 'JavaScript'],
    content: [
      'Modern web users expect near-instantaneous interaction. Google Search rankings now heavily penalize slow websites through Core Web Vitals metrics. Achieving top-tier performance requires engineering discipline at every level of the software stack.',
      '## 1. Mastering Core Web Vitals (LCP, INP, CLS)',
      'Understanding how browsers measure user experience is foundational:',
      '- **Largest Contentful Paint (LCP)**: Measures how quickly the main content of the page becomes visible. To optimize LCP, eliminate render-blocking CSS/JS, pre-connect to CDN domains, and use `fetchpriority="high"` for hero images.',
      '- **Interaction to Next Paint (INP)**: Measures responsiveness to user input (clicks, taps, typing). INP issues stem from long tasks on the JavaScript main thread. Break large computational blocks using `scheduler.yield()` or Web Workers.',
      '- **Cumulative Layout Shift (CLS)**: Measures visual stability. Always provide explicit `aspect-ratio` or `width`/`height` dimensions on images, dynamic banners, and embedded components to prevent unexpected content jumps.',
      '## 2. CSS GPU Compositing and Paint Optimization',
      'Not all CSS properties are created equal. Properties like `width`, `height`, and `top` trigger layout recalculations and full document repaints. In contrast, `transform` and `opacity` are composited directly on the GPU without triggering layout recalculations.',
      'Furthermore, heavy effects like `backdrop-filter: blur()` and large Gaussian blurs can cause severe GPU fill-rate exhaustion on mobile hardware. Profiling using Chrome DevTools Performance and Layers panels allows engineers to eliminate paint bottlenecks before deployment.',
      '## 3. Database Indexing and Query Performance',
      'Frontend speed is meaningless if backend endpoints take 800ms to respond. The most common database bottlenecks are missing indexes on frequently filtered columns (`WHERE` clauses) and unindexed foreign keys in `JOIN` queries.',
      'By analyzing query execution plans (`EXPLAIN ANALYZE` in PostgreSQL), developers can detect sequential table scans (`Seq Scan`) and replace them with efficient B-tree or GiST index scans. Implementing read-replicas and caching frequently requested records in Redis decouples expensive read loads from transactional primary databases.',
      '## 4. Conclusion',
      'True software engineering excellence lies in balancing rich visual interactivity with uncompromising speed. By measuring performance quantitatively and optimizing both client rendering and server architectures, we deliver experiences that delight users and drive real business outcomes.'
    ]
  }
];
