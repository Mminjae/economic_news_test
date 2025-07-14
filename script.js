// Sample Finance News Data
const newsData = [
  {
    id: 1,
    title: "Korean Won Strengthens Against Dollar Amid Economic Recovery",
    summary:
      "The Korean won gained ground against the US dollar today as investors showed renewed confidence in South Korea's economic recovery prospects following strong export data.",
    source: "Yonhap News",
    date: "2024-01-15",
    image:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=400&fit=crop",
    content:
      "The Korean won strengthened significantly against the US dollar in trading today, marking its best performance in three weeks. Market analysts attribute this surge to strong export data released earlier this morning, which showed a 12% increase in overseas shipments compared to the previous month. The won closed at 1,285 per dollar, up from 1,298 at the previous close. Economic experts suggest this trend reflects growing investor confidence in South Korea's post-pandemic economic recovery. The Bank of Korea has maintained its current monetary policy stance, citing stable inflation and steady economic growth as key factors supporting the currency's performance.",
  },
  {
    id: 2,
    title: "Samsung Electronics Reports Record Q4 Profits",
    summary:
      "Samsung Electronics announced record-breaking fourth-quarter profits driven by strong semiconductor demand and successful Galaxy smartphone launches.",
    source: "Naver",
    date: "2024-01-14",
    image:
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&h=400&fit=crop",
    content:
      "Samsung Electronics Co. reported its highest quarterly operating profit in company history, reaching 15.8 trillion won ($12.3 billion) for the fourth quarter of 2023. The tech giant's semiconductor division led the charge with exceptional performance in memory chips and processors. Revenue from the mobile division also exceeded expectations, thanks to robust sales of the Galaxy S23 series and successful market penetration in emerging economies. CEO Han Jong-hee credited the company's focus on innovation and strategic partnerships for the outstanding results. Looking ahead, Samsung projects continued growth in 2024, particularly in AI-driven technologies and next-generation semiconductors.",
  },
  {
    id: 3,
    title: "Bank of Korea Maintains Key Interest Rate at 3.5%",
    summary:
      "The central bank decided to keep the benchmark interest rate unchanged, citing balanced economic conditions and stable inflation expectations.",
    source: "KBS News",
    date: "2024-01-13",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=400&fit=crop",
    content:
      "The Bank of Korea (BOK) announced its decision to maintain the key interest rate at 3.5% for the third consecutive meeting. Governor Rhee Chang-yong emphasized that current economic indicators support this stable monetary policy approach. Inflation has remained within the target range of 2%, while employment levels continue to show steady improvement. The central bank's monetary policy board voted unanimously for the rate freeze, considering both domestic economic stability and global financial market conditions. Economists anticipate this accommodative stance will continue through the first half of 2024, supporting business investment and consumer spending.",
  },
  {
    id: 4,
    title: "Hyundai Motor Posts Strong Electric Vehicle Sales Growth",
    summary:
      "Hyundai Motor Company reported a 45% increase in global electric vehicle sales, strengthening its position in the rapidly growing EV market.",
    source: "Seoul Economic Daily",
    date: "2024-01-12",
    image:
      "https://images.unsplash.com/photo-1593941707882-a5bac6861d75?w=600&h=400&fit=crop",
    content:
      "Hyundai Motor Company announced impressive electric vehicle sales figures for 2023, with global EV sales jumping 45% year-over-year to reach 1.2 million units. The company's IONIQ series led this growth, particularly in European and North American markets. CEO Chang Jae-hoon highlighted the success of Hyundai's dedicated EV platform and aggressive expansion strategy. The automaker plans to introduce five new electric models in 2024 and aims to achieve carbon neutrality by 2045. Investment in battery technology and charging infrastructure partnerships have been key drivers of this success, positioning Hyundai as a major player in the global transition to sustainable mobility.",
  },
  {
    id: 5,
    title: "KOSPI Reaches New High as Foreign Investment Surges",
    summary:
      "Seoul's main stock index hit a new record high as foreign investors poured money into Korean equities, driven by strong corporate earnings and economic optimism.",
    source: "Maeil Business",
    date: "2024-01-11",
    image:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=400&fit=crop",
    content:
      "The KOSPI index surged to a new all-time high of 2,847.26 points, driven by substantial foreign investment inflows totaling 2.8 trillion won over the past week. Technology stocks led the rally, with Samsung Electronics and SK Hynix posting significant gains. Market analysts cite improving corporate fundamentals and attractive valuations as key factors attracting international investors. The surge reflects growing confidence in Korea's economic prospects and the resilience of its export-oriented economy. Trading volume reached exceptional levels as both institutional and retail investors participated in the rally. Financial experts suggest this momentum could continue as more positive earnings reports are expected in the coming weeks.",
  },
  {
    id: 6,
    title: "LG Energy Solution Expands Battery Production Capacity",
    summary:
      "The battery manufacturer announced a major expansion of its production facilities to meet growing demand from global automakers transitioning to electric vehicles.",
    source: "Business Korea",
    date: "2024-01-10",
    image:
      "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=600&h=400&fit=crop",
    content:
      "LG Energy Solution revealed plans to invest 5.2 trillion won in expanding its global battery production capacity over the next three years. The expansion will include new facilities in the United States, Europe, and Southeast Asia to serve major automotive clients including General Motors, Ford, and Stellantis. CEO Kim Jong-hyun emphasized the company's commitment to supporting the global electric vehicle transition while maintaining technological leadership in battery innovation. The expansion is expected to create over 15,000 new jobs worldwide and triple the company's current production capacity by 2027. This strategic investment positions LG Energy Solution to capture a larger share of the rapidly growing EV battery market.",
  },
  {
    id: 7,
    title: "Korean Startups Attract Record Venture Capital Investment",
    summary:
      "Venture capital investment in Korean startups reached an all-time high, with fintech and AI companies leading the funding surge.",
    source: "Tech Daily",
    date: "2024-01-09",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
    content:
      "Korean startups secured a record 8.4 trillion won in venture capital funding during 2023, representing a 35% increase from the previous year. Fintech companies attracted the largest share of investment, followed by artificial intelligence and biotechnology firms. Notable funding rounds included digital payment platform Toss raising 1.2 trillion won and AI startup Upstage securing 450 billion won. Industry experts attribute this growth to Korea's strong technology ecosystem and government support for innovation. The startup boom has created thousands of high-skilled jobs and positioned Korea as a leading destination for venture capital in Asia. Investors expect this trend to continue as more Korean startups expand globally.",
  },
  {
    id: 8,
    title: "POSCO Holdings Announces Green Steel Initiative",
    summary:
      "The steel giant unveiled ambitious plans to achieve carbon-neutral steel production by 2050, investing heavily in hydrogen-based steelmaking technology.",
    source: "Korea Herald",
    date: "2024-01-08",
    image:
      "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600&h=400&fit=crop",
    content:
      "POSCO Holdings announced a comprehensive green transformation strategy, committing 60 trillion won over the next 25 years to achieve carbon-neutral steel production. The plan centers on developing hydrogen-based direct reduction technology to replace traditional coal-fired blast furnaces. Chairman Choi Jeong-woo outlined the company's roadmap to reduce carbon emissions by 50% by 2030 and achieve complete carbon neutrality by 2050. The initiative includes partnerships with renewable energy companies and investment in green hydrogen production facilities. This ambitious transformation positions POSCO as a global leader in sustainable steel production and aligns with international climate commitments. The company expects the green steel initiative to create new business opportunities worth 30 trillion won annually by 2050.",
  },
];

// Application State
let bookmarkedNews = JSON.parse(localStorage.getItem("bookmarkedNews")) || [];
let currentFilter = "all";

// DOM Elements
const newsContainer = document.getElementById("newsContainer");
const loadingSpinner = document.getElementById("loadingSpinner");
const emptyState = document.getElementById("emptyState");
const modalOverlay = document.getElementById("modalOverlay");
const showAllBtn = document.getElementById("showAllBtn");
const showBookmarksBtn = document.getElementById("showBookmarksBtn");

// Initialize App
document.addEventListener("DOMContentLoaded", function () {
  setTimeout(() => {
    loadingSpinner.style.display = "none";
    renderNews();
    updateFilterButtons();
  }, 1500);
});

// Render News Cards
function renderNews() {
  const filteredNews =
    currentFilter === "all"
      ? newsData
      : newsData.filter((news) => bookmarkedNews.includes(news.id));

  if (filteredNews.length === 0 && currentFilter === "bookmarked") {
    newsContainer.style.display = "none";
    emptyState.style.display = "block";
    return;
  }

  newsContainer.style.display = "grid";
  emptyState.style.display = "none";

  newsContainer.innerHTML = filteredNews
    .map(
      (news) => `
        <article class="news-card" onclick="openModal(${news.id})">
            <img src="${news.image}" alt="${news.title}" class="card-image">
            <div class="card-content">
                <div class="card-header">
                    <span class="news-source">${news.source}</span>
                    <button class="bookmark-btn ${bookmarkedNews.includes(news.id) ? "bookmarked" : ""}" 
                            onclick="event.stopPropagation(); toggleBookmark(${news.id})">
                        <i class="fas fa-star"></i>
                    </button>
                </div>
                <h3 class="news-title">${news.title}</h3>
                <p class="news-summary">${news.summary}</p>
                <div class="news-meta">
                    <span class="news-date">${formatDate(news.date)}</span>
                    <a href="#" class="read-more" onclick="event.stopPropagation(); openModal(${news.id})">
                        Read More →
                    </a>
                </div>
            </div>
        </article>
    `,
    )
    .join("");
}

// Toggle Bookmark
function toggleBookmark(newsId) {
  const index = bookmarkedNews.indexOf(newsId);
  if (index === -1) {
    bookmarkedNews.push(newsId);
  } else {
    bookmarkedNews.splice(index, 1);
  }

  localStorage.setItem("bookmarkedNews", JSON.stringify(bookmarkedNews));
  renderNews();

  // Show feedback animation
  const bookmarkBtn = event.target.closest(".bookmark-btn");
  bookmarkBtn.style.transform = "scale(1.3)";
  setTimeout(() => {
    bookmarkBtn.style.transform = "scale(1)";
  }, 200);
}

// Filter News
function filterNews(filter) {
  currentFilter = filter;
  updateFilterButtons();
  renderNews();
}

// Update Filter Button States
function updateFilterButtons() {
  showAllBtn.classList.toggle("active", currentFilter === "all");
  showBookmarksBtn.classList.toggle("active", currentFilter === "bookmarked");
}

// Open Modal
function openModal(newsId) {
  const news = newsData.find((item) => item.id === newsId);
  if (!news) return;

  document.getElementById("modalTitle").textContent = news.title;
  document.getElementById("modalImage").src = news.image;
  document.getElementById("modalImage").alt = news.title;
  document.getElementById("modalSource").textContent = news.source;
  document.getElementById("modalDate").textContent = formatDate(news.date);
  document.getElementById("modalSummary").textContent = news.summary;
  document.getElementById("modalContent").innerHTML = news.content
    .split(". ")
    .map((sentence) =>
      sentence.trim()
        ? `<p>${sentence.trim()}${sentence.trim().endsWith(".") ? "" : "."}</p>`
        : "",
    )
    .join("");

  modalOverlay.classList.add("active");
  document.body.style.overflow = "hidden";
}

// Close Modal
function closeModal() {
  modalOverlay.classList.remove("active");
  document.body.style.overflow = "auto";
}

// Format Date
function formatDate(dateString) {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(dateString).toLocaleDateString("en-US", options);
}

// Keyboard Navigation
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && modalOverlay.classList.contains("active")) {
    closeModal();
  }
});

// Handle Window Resize
window.addEventListener("resize", function () {
  // Adjust modal positioning if needed
  if (modalOverlay.classList.contains("active")) {
    const modalContent = modalOverlay.querySelector(".modal-content");
    modalContent.style.maxHeight = "90vh";
  }
});

// Add loading animation for images
function addImageLoadingEffect() {
  const images = document.querySelectorAll(".card-image, #modalImage");
  images.forEach((img) => {
    img.addEventListener("load", function () {
      this.style.opacity = "1";
    });
    img.addEventListener("error", function () {
      this.src =
        "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=400&fit=crop";
    });
  });
}

// Initialize image loading effects
document.addEventListener("DOMContentLoaded", addImageLoadingEffect);
