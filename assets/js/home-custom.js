var iUp = (function () {
  var time = 0;
  var duration = 150;

  function up(element) {
    setTimeout(function () {
      element.classList.add("up");
    }, time);
    time += duration;
  }

  return { up: up };
})();

var bingImagePattern = /^\/th\?id=OHR\.[a-zA-Z0-9_-]+\.jpg(&[a-zA-Z0-9=._-]+)*$/;
var backgroundImages = [];
var backgroundIndex = -1;
var activeBackgroundLayer = 0;
var lastHitokotoText = "";
var hitokotoLoading = false;

if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

var currentLanguage = "en";
var translations = [
  [".panel-cover__title a", "Gao Yujie", "高宇杰"],
  [".panel-cover__subtitle", "AI MPhil @ HKUST | First Class Honours B.Eng. | Robotics Engineering", "香港科技大学 AI 方向 MPhil 在读 | 一等荣誉工学学士 | 机器人工程"],
  [".cover-navigation--primary .navigation__item:nth-child(1) a", "Highlights", "亮点"],
  [".cover-navigation--primary .navigation__item:nth-child(2) a", "CV Map", "履历"],
  [".cover-navigation--primary .navigation__item:nth-child(3) a", "Research", "研究"],
  [".cover-navigation--primary .navigation__item:nth-child(4) a", "Publications", "论文"],
  [".cover-navigation--primary .navigation__item:nth-child(5) a", "Entrepreneurship", "创业"],
  [".cover-navigation--primary .navigation__item:nth-child(6) a", "Experience", "经历"],
  [".cover-navigation--primary .navigation__item:nth-child(7) a", "Awards", "荣誉"],
  [".cover-navigation--primary .navigation__item:nth-child(8) a", "Resume", "简历"],
  [".cover-navigation--primary .navigation__item:nth-child(9) a", "Profiles", "联系"],
  [".cover-navigation--primary .navigation__item:nth-child(10) a", "Enter Site", "进入"],
  ["#highlights .section-kicker", "Highlights", "核心亮点"],
  ["#highlights h2", "A quick visual map of AI research, agentic robotics, and entrepreneurship.", "以 AI 研究、智能体机器人与技术创业为主线的能力图谱。"],
  ["#highlights .metric-wall article:nth-child(1) span", "AI research direction in progress at HKUST", "香港科技大学 AI 研究方向在读"],
  ["#highlights .metric-wall article:nth-child(2) strong", "1st Class", "一等荣誉"],
  ["#highlights .metric-wall article:nth-child(2) span", "Honours B.Eng. in Robotics Engineering", "机器人工程荣誉工学学士"],
  ["#highlights .metric-wall article:nth-child(3) span", "First-author robotics and engineering papers", "机器人与工程方向一作/核心论文"],
  ["#highlights .metric-wall article:nth-child(4) span", "National and provincial competitions led or joined", "参与或负责国家级、省级竞赛"],
  [".skill-bars .bar-row:nth-child(1) span", "AI-driven robotics", "AI 驱动机器人"],
  [".skill-bars .bar-row:nth-child(2) span", "LLM and agentic systems", "大模型与智能体系统"],
  [".skill-bars .bar-row:nth-child(3) span", "Multimodal perception", "多模态感知"],
  [".skill-bars .bar-row:nth-child(4) span", "AI product commercialization", "AI 产品转化"],
  [".ai-stack-list span:nth-child(1)", "LLM reasoning", "大模型推理"],
  [".ai-stack-list span:nth-child(2)", "Agent planning", "智能体规划"],
  [".ai-stack-list span:nth-child(3)", "Multimodal perception", "多模态感知"],
  [".ai-stack-list span:nth-child(4)", "Robotic execution", "机器人执行"],
  [".ai-stack-list span:nth-child(5)", "Embedded control", "嵌入式控制"],
  [".ai-stack-list span:nth-child(6)", "Product validation", "产品验证"],
  [".image-showcase figcaption", "AI-centered research map: LLM reasoning, agent planning, multimodal perception, robotics, and product validation.", "以 AI 为中心的研究路径：大模型推理、智能体规划、多模态感知、机器人执行与产品验证。"],
  ["#cv-snapshot .section-kicker", "Profile Snapshot", "履历概览"],
  ["#cv-snapshot h2", "A concise profile of research output, product work, leadership, and service.", "研究产出、产品实践、组织领导与学术服务的综合概览。"],
  ["#cv-snapshot article:nth-child(1) h3", "Education Direction", "教育背景"],
  ["#cv-snapshot article:nth-child(1) p", "AI-oriented MPhil in progress at HKUST, building from a First Class Honours B.Eng. background in Robotics Engineering.", "香港科技大学 AI 方向 MPhil 在读，本科为机器人工程一等荣誉工学学士。"],
  ["#cv-snapshot article:nth-child(1) strong", "AI + Robotics + Embodied systems", "AI + 机器人 + 具身系统"],
  ["#cv-snapshot article:nth-child(2) h3", "Research Projects", "研究项目"],
  ["#cv-snapshot article:nth-child(2) p", "LMBSWO obstacle-avoidance path planning, robot visual inspection, multimodal feature fusion, embedded fruit-picking robot, and ML-based structural prediction.", "覆盖 LMBSWO 避障路径规划、机器人视觉巡检、多模态特征融合、嵌入式采摘机器人与结构性能机器学习预测。"],
  ["#cv-snapshot article:nth-child(2) strong", "Algorithms to embodied systems", "从算法到具身系统"],
  ["#cv-snapshot article:nth-child(3) h3", "Technical Evidence", "技术证据"],
  ["#cv-snapshot article:nth-child(3) p", "Path-planning validation across complex maps, embedded vision pipelines, robotic arm coordination, factor analysis, and machine-learning model comparison.", "包含复杂地图路径规划验证、嵌入式视觉流程、机械臂协同、因子分析与多模型对比。"],
  ["#cv-snapshot article:nth-child(3) strong", "Simulation, hardware, and data", "仿真、硬件与数据"],
  ["#cv-snapshot article:nth-child(4) h3", "Research Outputs", "研究产出"],
  ["#cv-snapshot article:nth-child(4) p", "SCI and EI outputs spanning mobile robot planning, machine vision inspection, machine learning for structures, renewable energy, MoE models, and digital service trade.", "SCI/EI 产出覆盖移动机器人规划、机器视觉巡检、结构机器学习、可再生能源、MoE 模型与数字服务贸易。"],
  ["#cv-snapshot article:nth-child(5) h3", "IP & Products", "知识产权与产品"],
  ["#cv-snapshot article:nth-child(5) p", "Software copyrights, utility-model patent work, intelligent recognition devices, AI office systems, smart-home systems, PVDF sonar, and smart pet hardware.", "涉及软著、实用新型、智能识别设备、AI 办公系统、智能家居系统、PVDF 声呐与智能宠物硬件。"],
  ["#cv-snapshot article:nth-child(5) strong", "Research-to-product portfolio", "研究到产品转化"],
  ["#cv-snapshot article:nth-child(6) h3", "Leadership & Service", "领导力与服务"],
  ["#cv-snapshot article:nth-child(6) p", "Technology-company founder experience, competition leadership, reviewer service, entrepreneurship forums, volunteer work, and industry-research association roles.", "包括科技公司创始经历、竞赛负责、期刊审稿、创业论坛、志愿服务与产研组织角色。"],
  ["#research .section-kicker", "Selected Research", "代表性研究"],
  ["#research h2", "Algorithms, perception, and embodied AI systems.", "算法、感知与具身智能系统。"],
  ["#research .card-grid article:nth-child(1) p", "Improved Spider-Wasp Optimizer for mobile robot path planning, integrating learning strategy, dual-median-point guidance, and local escape mechanisms.", "面向移动机器人路径规划的改进 Spider-Wasp Optimizer，融合学习策略、双中点引导与局部逃逸机制。"],
  ["#research .card-grid article:nth-child(2) h3", "AI visual inspection and semantic mapping", "AI 视觉巡检与语义建图"],
  ["#research .card-grid article:nth-child(2) p", "Robot visual perception system for dynamic inspection scenes, combining lightweight detection, semantic mapping, and adaptive resolution control.", "面向动态巡检场景的机器人视觉感知系统，结合轻量检测、语义建图与自适应分辨率控制。"],
  ["#research .card-grid article:nth-child(3) h3", "Machine learning for engineering structures", "工程结构机器学习"],
  ["#research .card-grid article:nth-child(3) p", "Cross-domain work applying factor analysis, multiple ML models, and Bayesian optimization to composite structural performance prediction.", "跨学科研究，将因子分析、多种机器学习模型与贝叶斯优化用于复合结构性能预测。"],
  ["#research .card-grid article:nth-child(4) h3", "ASC-CogFusion multimodal feature fusion", "ASC-CogFusion 多模态特征融合"],
  ["#research .card-grid article:nth-child(4) p", "Heuristic-algorithm-based multisensor multimodal feature fusion work, connecting sensor reasoning, cognition-inspired fusion, and robust robot perception.", "基于启发式算法的多传感器多模态融合工作，连接传感器推理、认知式融合与稳健机器人感知。"],
  ["#research .card-grid article:nth-child(5) h3", "Fruit-picking robot with embedded AI", "嵌入式 AI 采摘机器人"],
  ["#research .card-grid article:nth-child(5) p", "RAICOM champion project combining STM32F411 lower-computer control, Jetson Nano image recognition, robotic arm coordination, and autonomous path following.", "RAICOM 冠军项目，结合 STM32F411 下位机控制、Jetson Nano 图像识别、机械臂协同与自主循迹。"],
  ["#research .card-grid article:nth-child(6) h3", "PVDF sonar and intelligent sensing", "PVDF 声呐与智能感知"],
  ["#research .card-grid article:nth-child(6) p", "Product-facing work around PVDF membrane sonar, intelligent recognition devices, and sensor-oriented technology transfer for robotics and marine applications.", "围绕 PVDF 薄膜声呐、智能识别设备与面向机器人/海洋应用的传感技术转化。"],
  ["#publications .section-kicker", "Publications", "论文发表"],
  ["#publications h2", "Research outputs across robotics, AI, and engineering.", "机器人、AI 与工程交叉方向的研究产出。"],
  ["#ventures .section-kicker", "Entrepreneurship", "创业实践"],
  ["#ventures h2", "Research-to-product work in robotics, sensors, and intelligent hardware.", "围绕机器人、传感器与智能硬件的研究到产品实践。"],
  ["#ventures article:nth-child(1) h3", "Deep-sea robotics and PVDF membrane sonar", "深海机器人与 PVDF 薄膜声呐"],
  ["#ventures article:nth-child(1) p", "Founder work around deep-sea explorer robots, PVDF membrane sonar, product experiments, signed orders, institutional cooperation, and intellectual property accumulation.", "围绕深海探测机器人与 PVDF 薄膜声呐开展创始人工作，包括产品实验、订单签约、机构合作与知识产权积累。"],
  ["#ventures article:nth-child(2) h3", "AI + hardware + pet products", "AI + 硬件 + 宠物产品"],
  ["#ventures article:nth-child(2) p", "Ongoing startup exploration focused on multimodal behavior recognition, user demand research, supply-chain confirmation, UI design, product delivery, and market validation.", "持续探索多模态行为识别、用户需求调研、供应链确认、UI 设计、产品交付与市场验证。"],
  ["#experience .section-kicker", "Experience Timeline", "经历时间线"],
  ["#experience h2", "Hands-on work across robotics, automation, market research, and embodied AI.", "机器人、自动化、市场研究与具身智能相关实践。"],
  ["#experience article:nth-child(1) h3", "Automation instrumentation engineering intern", "自动化仪表工程实习"],
  ["#experience article:nth-child(1) p", "Worked with safety inspection and automatic-control project teams in industrial automation scenarios.", "在工业自动化场景中参与安全检测与自动控制项目团队工作。"],
  ["#experience article:nth-child(2) h3", "PLC control engineering technician intern", "PLC 控制工程技术实习"],
  ["#experience article:nth-child(2) p", "Participated in intelligent equipment work involving control engineering and practical automation systems.", "参与智能装备相关工作，涉及控制工程与实际自动化系统。"],
  ["#experience article:nth-child(3) h3", "Electronic technology market research intern", "电子技术市场研究实习"],
  ["#experience article:nth-child(3) p", "Investigated market demand, product positioning, and technology application paths for consumer-facing products.", "调研消费产品的市场需求、产品定位与技术应用路径。"],
  ["#awards .section-kicker", "Awards, IP & Service", "荣誉、知识产权与服务"],
  ["#awards h2", "Competitions, intellectual property, and community work.", "竞赛荣誉、知识产权与学术/社会服务。"],
  ["#awards article:nth-child(1) h3", "Competition Awards", "竞赛荣誉"],
  ["#awards article:nth-child(2) h3", "Patents & Software Copyright", "专利与软件著作权"],
  ["#awards article:nth-child(3) h3", "Service & Leadership", "服务与领导力"],
  ["#resume .section-kicker", "Interactive Resume", "交互式简历"],
  ["#resume h2", "Swipe through core resume cards.", "滑动浏览核心履历卡片。"],
  ["#resume .resume-slide:nth-of-type(1) h3", "Education", "教育背景"],
  ["#resume .resume-slide:nth-of-type(1) p", "AI-oriented MPhil in progress at HKUST. First Class Honours B.Eng. in Robotics Engineering, with research focus on robotics, machine vision, path planning, and intelligent hardware.", "香港科技大学 AI 方向 MPhil 在读。机器人工程一等荣誉工学学士，研究关注机器人、机器视觉、路径规划与智能硬件。"],
  ["#resume .resume-slide:nth-of-type(2) h3", "Academic projects", "学术项目"],
  ["#resume .resume-slide:nth-of-type(2) p", "LMBSWO path planning, automatic fruit picking and autonomous path-following robotic arm, multisensor multimodal feature fusion, robot inspection perception, and structural ML prediction.", "包括 LMBSWO 路径规划、自动采摘与循迹机械臂、多传感器多模态特征融合、机器人巡检感知与结构机器学习预测。"],
  ["#resume .resume-slide:nth-of-type(3) h3", "Competitions", "竞赛经历"],
  ["#resume .resume-slide:nth-of-type(3) p", "RAICOM Robot Developer Competition International First Prize, China Robotics Skills Competition National First Prize, and MCM/ICM Honorable Mention twice.", "获得 RAICOM 机器人开发者竞赛国际一等奖、中国机器人技能竞赛全国一等奖，以及两次 MCM/ICM Honorable Mention。"],
  ["#resume .resume-slide:nth-of-type(4) h3", "Internship experience", "实习经历"],
  ["#resume .resume-slide:nth-of-type(4) p", "Industrial automation, PLC control engineering, and electronic technology market research experience.", "具备工业自动化、PLC 控制工程与电子技术市场研究相关经历。"],
  ["#resume .resume-slide:nth-of-type(5) h3", "Intellectual property", "知识产权"],
  ["#resume .resume-slide:nth-of-type(5) p", "Software copyrights and patent work around intelligent recognition, machine-learning data acquisition, smart home systems, and AI office control.", "围绕智能识别、机器学习数据采集、智能家居系统与 AI 办公控制开展软著与专利工作。"],
  ["#resume .resume-slide:nth-of-type(6) h3", "Research outputs", "研究产出"],
  ["#resume .resume-slide:nth-of-type(6) p", "SCI, EI, and conference-facing work across robot path planning, visual inspection, engineering structures, renewable energy systems, MoE models, and digital economy analysis.", "研究产出覆盖机器人路径规划、视觉巡检、工程结构、可再生能源系统、MoE 模型与数字经济分析。"],
  ["#resume .resume-slide:nth-of-type(7) h3", "Entrepreneurship", "创业实践"],
  ["#resume .resume-slide:nth-of-type(7) p", "Founder or technical-founder work spanning deep-sea robotics, PVDF membrane sonar, intelligent robotics, fine chemicals, cosmetics, and smart pet products.", "创始人或技术创始角色覆盖深海机器人、PVDF 薄膜声呐、智能机器人、精细化工、化妆品与智能宠物产品。"],
  ["#resume .resume-slide:nth-of-type(8) h3", "Service", "学术服务"],
  ["#resume .resume-slide:nth-of-type(8) p", "Reviewer for Frontiers in Robotics and AI and Machine Learning with Applications, member of interdisciplinary sustainability communities, entrepreneurship forum host, and volunteer contributor.", "担任 Frontiers in Robotics and AI 与 Machine Learning with Applications 审稿人，并参与跨学科可持续技术社群、创业论坛组织与志愿服务。"],
  [".download-links a", "Download Portfolio PDF", "下载作品集 PDF"],
  ["#profiles .section-kicker", "Profiles & Contact", "学术主页与联系"],
  ["#profiles h2", "Academic profiles and direct contact.", "学术主页与直接联系方式。"],
  [".wechat-label", "WeChat Official Account", "微信公众号"],
  [".wechat-card h3", "Silicon Edge", "硅基边缘"],
  [".wechat-card p:last-of-type", "AI, embodied intelligence, robotics, and edge-side product notes.", "分享 AI、具身智能、机器人与端侧产品思考。"],
  [".quick-rail .quick-top", "Top", "顶"]
];

function applyLanguage(language) {
  currentLanguage = language;
  document.title = language === "zh" ? "高宇杰 | AI 与机器人" : "Gao Yujie | AI & Robotics";
  document.documentElement.lang = language === "zh" ? "zh-CN" : "en";
  translations.forEach(function (entry) {
    var element = document.querySelector(entry[0]);
    if (!element) return;
    element.textContent = language === "zh" ? entry[2] : entry[1];
  });
  var button = document.querySelector("[data-lang-toggle]");
  if (button) {
    button.textContent = language === "zh" ? "EN" : "中文";
    button.setAttribute("aria-label", language === "zh" ? "Switch to English" : "切换到中文");
  }
}

function setupLanguageToggle() {
  applyLanguage("en");
  var button = document.querySelector("[data-lang-toggle]");
  if (!button) return;
  button.addEventListener("click", function () {
    applyLanguage(currentLanguage === "zh" ? "en" : "zh");
  });
}

function applyBingImages() {
  if (!Array.isArray(window.BING_IMAGES) || window.BING_IMAGES.length === 0) return;
  backgroundImages = window.BING_IMAGES.filter(function (imagePath) {
    return bingImagePattern.test(imagePath);
  });
  rotateBackground();
  window.setInterval(rotateBackground, 2000);
}

function rotateBackground() {
  if (!backgroundImages.length) return;

  var layers = document.querySelectorAll(".bg-layer");
  if (layers.length < 2) return;

  var key = "gy-homepage-bing-index";
  var stored = parseInt(sessionStorage.getItem(key), 10);
  if (backgroundIndex < 0) {
    backgroundIndex = Number.isNaN(stored) ? 0 : stored;
  } else {
    backgroundIndex = (backgroundIndex + 1) % backgroundImages.length;
  }

  var imagePath = backgroundImages[backgroundIndex];
  var nextLayerIndex = activeBackgroundLayer === 0 ? 1 : 0;
  var nextLayer = layers[nextLayerIndex];
  var currentLayer = layers[activeBackgroundLayer];

  nextLayer.style.backgroundImage = "url('https://cn.bing.com" + imagePath.replace(/['\\]/g, "\\$&") + "')";
  nextLayer.classList.add("active");
  currentLayer.classList.remove("active");
  activeBackgroundLayer = nextLayerIndex;
  sessionStorage.setItem(key, String(backgroundIndex));
}

function renderQuote(quote) {
  var description = document.querySelector("#description");
  if (!description || !quote) return;
  if (quote.text === lastHitokotoText) return;
  lastHitokotoText = quote.text;

  description.classList.add("quote-fading");
  window.setTimeout(function () {
    description.textContent = "";
    description.appendChild(document.createTextNode(quote.text));
    description.appendChild(document.createElement("br"));
    var source = document.createElement("strong");
    source.textContent = "- " + quote.from;
    description.appendChild(source);
    description.classList.remove("quote-fading");
  }, 420);
}

function requestHitokoto() {
  return fetch("https://v1.hitokoto.cn/?encode=json", { cache: "no-store" })
    .then(function (response) {
      return response.json();
    });
}

function loadHitokoto() {
  if (hitokotoLoading) return;
  hitokotoLoading = true;
  requestHitokoto()
    .then(function (data) {
      if (data.hitokoto === lastHitokotoText) return requestHitokoto();
      return data;
    })
    .then(function (data) {
      if (!data.hitokoto) return;
      renderQuote({
        text: data.hitokoto,
        from: data.from || "Hitokoto"
      });
    })
    .catch(function () {})
    .finally(function () {
      hitokotoLoading = false;
    });
}

function loadImagesScript() {
  var script = document.createElement("script");
  script.src = "assets/json/images.js?t=" + Date.now();
  script.onload = applyBingImages;
  document.body.appendChild(script);
}

function setupResumeSlider() {
  var slides = Array.prototype.slice.call(document.querySelectorAll(".resume-slide"));
  var dots = document.querySelector(".resume-dots");
  var index = 0;
  var touchStartX = 0;
  var touchStartY = 0;
  var strip = document.querySelector(".resume-strip");
  var direction = "next";

  if (!slides.length || !dots || !strip) return;

  function show(next) {
    direction = next >= index ? "next" : "prev";
    index = (next + slides.length) % slides.length;
    slides.forEach(function (slide, slideIndex) {
      slide.classList.toggle("active", slideIndex === index);
      slide.classList.toggle("from-prev", slideIndex === index && direction === "prev");
    });
    Array.prototype.slice.call(dots.children).forEach(function (dot, dotIndex) {
      dot.classList.toggle("active", dotIndex === index);
      dot.setAttribute("aria-current", dotIndex === index ? "step" : "false");
    });
  }

  slides.forEach(function (_, slideIndex) {
    var dot = document.createElement("button");
    dot.className = "dot";
    dot.type = "button";
    dot.setAttribute("aria-label", "Open resume card " + (slideIndex + 1));
    dot.addEventListener("click", function () {
      show(slideIndex);
    });
    dots.appendChild(dot);
  });

  document.querySelectorAll("[data-resume-action]").forEach(function (button) {
    button.addEventListener("click", function () {
      show(index + (button.getAttribute("data-resume-action") === "next" ? 1 : -1));
    });
  });

  strip.addEventListener("touchstart", function (event) {
    var touch = event.changedTouches[0];
    touchStartX = touch.clientX;
    touchStartY = touch.clientY;
  }, { passive: true });

  strip.addEventListener("touchend", function (event) {
    var touch = event.changedTouches[0];
    var deltaX = touch.clientX - touchStartX;
    var deltaY = touch.clientY - touchStartY;
    if (Math.abs(deltaX) > 44 && Math.abs(deltaX) > Math.abs(deltaY) * 1.2) {
      show(index + (deltaX < 0 ? 1 : -1));
    }
  }, { passive: true });

  show(0);
}

function setupSectionReveal() {
  var sections = Array.prototype.slice.call(document.querySelectorAll(".home-section"));
  if (!sections.length) return;

  sections.forEach(function (section) {
    section.classList.add("reveal-section");
    var items = Array.prototype.slice.call(section.querySelectorAll([
      ".section-kicker",
      "h2",
      ".metric-wall article",
      ".visual-board",
      ".image-showcase",
      ".cv-snapshot-grid article",
      ".research-visual",
      ".card-grid article",
      ".list-panel p",
      ".split-panel article",
      ".timeline article",
      ".badge-matrix article",
      ".resume-strip",
      ".resume-dots",
      ".download-links",
      ".profile-link-grid a",
      ".wechat-card"
    ].join(",")));

    items.forEach(function (item, index) {
      item.classList.add("reveal-item");
      item.style.setProperty("--stagger", Math.min(index * 55, 420) + "ms");
      item.style.setProperty("--flow", "0");
    });
  });

  if (!("IntersectionObserver" in window)) {
    sections.forEach(function (section) {
      section.classList.add("is-visible");
    });
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { rootMargin: "0px 0px -4% 0px", threshold: 0.04 });

  sections.forEach(function (section) {
    observer.observe(section);
  });
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function setupScrollFlow() {
  var items = Array.prototype.slice.call(document.querySelectorAll(".reveal-item"));
  if (!items.length) return;

  var ticking = false;

  function updateFlow() {
    var viewportHeight = window.innerHeight || 1;
    items.forEach(function (item) {
      var rect = item.getBoundingClientRect();
      var center = rect.top + rect.height * 0.5;
      var distance = Math.abs(center - viewportHeight * 0.48);
      var flow = clamp(1 - distance / (viewportHeight * 0.72), 0, 1);
      item.style.setProperty("--flow", flow.toFixed(3));
    });
    ticking = false;
  }

  function requestUpdate() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(updateFlow);
  }

  updateFlow();
  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestUpdate);
}

function setupScrollSpy() {
  var links = Array.prototype.slice.call(document.querySelectorAll(".cover-navigation--primary a[href^='#'], .quick-rail a[href^='#']"));
  if (!links.length || !("IntersectionObserver" in window)) return;

  var linkById = {};
  links.forEach(function (link) {
    var href = link.getAttribute("href");
    if (href && href.length > 1) linkById[href.slice(1)] = link;
  });

  var sections = Object.keys(linkById)
    .map(function (id) { return document.getElementById(id); })
    .filter(Boolean);

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      links.forEach(function (link) {
        link.classList.remove("is-active");
      });
      var active = linkById[entry.target.id];
      if (active) active.classList.add("is-active");
    });
  }, { rootMargin: "-35% 0px -55% 0px", threshold: 0.01 });

  sections.forEach(function (section) {
    observer.observe(section);
  });
}

function addRipple(event) {
  var target = event.currentTarget;
  var rect = target.getBoundingClientRect();
  var ripple = document.createElement("span");
  ripple.className = "click-ripple";
  ripple.style.left = (event.clientX - rect.left) + "px";
  ripple.style.top = (event.clientY - rect.top) + "px";
  target.appendChild(ripple);
  window.setTimeout(function () {
    ripple.remove();
  }, 560);
}

function setupClickDynamics() {
  var selector = [
    ".navigation__item a",
    ".quick-rail a",
    ".download-links a",
    ".profile-link-grid a",
    ".resume-arrow",
    ".dot"
  ].join(",");

  document.querySelectorAll(selector).forEach(function (element) {
    element.addEventListener("click", addRipple);
  });
}

function scrollToTarget(target, smooth) {
  if (!target) return;
  target.scrollIntoView({ behavior: smooth ? "smooth" : "auto", block: "start" });
}

function getInternalTarget(link) {
  var href = link.getAttribute("href");
  if (!href || href.charAt(0) !== "#") return null;
  if (href.length === 1) return null;
  return document.querySelector(href);
}

function collapseCover(target) {
  var mobileNav = document.querySelector(".navigation-wrapper");
  var mobileButton = document.querySelector(".btn-mobile-menu__icon");

  if (mobileNav) mobileNav.classList.remove("visible");
  if (mobileButton) {
    mobileButton.classList.add("icon-list");
    mobileButton.classList.remove("icon-angleup");
  }

  if (target) {
    window.setTimeout(function () {
      scrollToTarget(target, true);
    }, 80);
  }
}

function setupInternalNavigation() {
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (event) {
      var target = getInternalTarget(link);
      if (!target) return;
      event.preventDefault();
      collapseCover(target);
      history.pushState(null, "", link.getAttribute("href"));
    });
  });

  if (window.location.hash) {
    var initialTarget = document.querySelector(window.location.hash);
    if (initialTarget) {
      window.setTimeout(function () {
        scrollToTarget(initialTarget, false);
      }, 120);
      window.addEventListener("load", function () {
        scrollToTarget(initialTarget, false);
      });
    }
  } else {
    window.scrollTo(0, 0);
    window.addEventListener("pageshow", function () {
      window.scrollTo(0, 0);
    });
  }
}

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".iUp").forEach(function (element) {
    iUp.up(element);
  });

  loadHitokoto();
  loadImagesScript();
  setupLanguageToggle();
  setupResumeSlider();
  setupSectionReveal();
  setupScrollFlow();
  setupInternalNavigation();
  setupScrollSpy();
  setupClickDynamics();
  window.setInterval(loadHitokoto, 2000);

  var mobileButton = document.querySelector(".btn-mobile-menu__icon");
  var navigation = document.querySelector(".navigation-wrapper");
  if (mobileButton && navigation) {
    mobileButton.addEventListener("click", function () {
      navigation.classList.toggle("visible");
      mobileButton.classList.toggle("icon-list");
      mobileButton.classList.toggle("icon-angleup");
    });
  }
});
