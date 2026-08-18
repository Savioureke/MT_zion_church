import os

images = {
    "hero_sunset.jpg": ("Welcome to GracePoint", "Faith. Family. Community.", "#735c00", "#1c1c1a"),
    "family_worship.jpg": ("Rooted in Faith", "Growing in Grace", "#554300", "#2c2c2b"),
    "sermon_sanctuary.jpg": ("Walking on Water", "Trusting the Unseen", "#735c00", "#f6f3ef"),
    "sermon_bible.jpg": ("Architecture of Forgiveness", "Understanding Grace", "#4d4635", "#e5e2de"),
    "sermon_misty_valley.jpg": ("Rooted Together", "The Power of Assembly", "#31302e", "#d4af37"),
    "track_thumb.jpg": ("GracePoint Audio", "Sermon Track", "#735c00", "#1c1c1a"),
    "watch_live_stage.jpg": ("Sunday Worship Experience", "Live Broadcast", "#1c1c1a", "#d4af37"),
    "pastor_speaking.jpg": ("Power of Stillness", "Pastor David Chen", "#4d4635", "#f0ede9"),
    "congregation.jpg": ("Faith Under Fire", "Dr. Sarah Jenkins", "#31302e", "#eae8e4"),
    "bible_study.jpg": ("Understanding Grace", "Bible Study Series", "#735c00", "#f6f3ef"),
    "gospel_ancient_book.jpg": ("Who is Jesus?", "Identity & Evidence", "#2c2c2b", "#d4af37"),
    "gospel_path.jpg": ("Living for Christ", "Application & Purpose", "#735c00", "#1c1c1a"),
    "salvation_sunrise.jpg": ("Start Your Journey", "With Christ", "#735c00", "#fcf9f5"),
    "step1_forest_path.jpg": ("What is the Gospel?", "Step 1 of 7", "#4d4635", "#f6f3ef"),
    "growth_olive_grove.jpg": ("My Faith Journey", "Growth & Discipleship", "#735c00", "#2c2c2b"),
    "lesson_video_still.jpg": ("Nature of Grace", "Dr. Sarah Jenkins", "#1c1c1a", "#d4af37"),
    "dashboard_pattern.jpg": ("GracePoint Hub", "Spiritual Dashboard", "#735c00", "#f0ede9"),
    "dashboard_bible_tea.jpg": ("Finding Purpose", "Daily Devotional", "#4d4635", "#e5e2de"),
    "event_worship.jpg": ("Autumn Community Worship", "Sunday Worship", "#735c00", "#f6f3ef"),
    "event_bible_study.jpg": ("Midweek Theological Study", "Wednesdays 7PM", "#31302e", "#eae8e4"),
    "event_outreach.jpg": ("City Outreach Morning", "Community Service", "#554300", "#f0ede9"),
}

target_dir = r"c:\Users\HomePC\Documents\digital_ministry_hub\frontend\public\images"
os.makedirs(target_dir, exist_ok=True)

for fname, (title, subtitle, color1, color2) in images.items():
    filepath = os.path.join(target_dir, fname)
    # Check if file exists and has size > 1000 bytes
    if os.path.exists(filepath) and os.path.getsize(filepath) > 1000:
        continue
    
    svg_filename = fname.replace('.jpg', '.svg')
    svg_filepath = os.path.join(target_dir, svg_filename)
    
    svg_content = f'''<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:{color1};stop-opacity:1" />
      <stop offset="100%" style="stop-color:{color2};stop-opacity:1" />
    </linearGradient>
    <radialGradient id="sun" cx="50%" cy="30%" r="60%">
      <stop offset="0%" style="stop-color:#ffe088;stop-opacity:0.6" />
      <stop offset="100%" style="stop-color:{color1};stop-opacity:0" />
    </radialGradient>
  </defs>
  <rect width="1200" height="800" fill="url(#grad)" />
  <circle cx="600" cy="240" r="400" fill="url(#sun)" />
  <path d="M 0 550 Q 300 480 600 550 T 1200 520 L 1200 800 L 0 800 Z" fill="#1c1c1a" opacity="0.4"/>
  <path d="M 0 620 Q 400 580 800 640 T 1200 610 L 1200 800 L 0 800 Z" fill="#1c1c1a" opacity="0.6"/>
  <g transform="translate(600, 360)" text-anchor="middle">
    <text font-family="'Libre Caslon Text', Georgia, serif" font-size="44" font-weight="bold" fill="#ffffff" y="0">{title}</text>
    <text font-family="'Hanken Grotesk', sans-serif" font-size="22" font-weight="600" fill="#d4af37" y="50" letter-spacing="2">{subtitle.upper()}</text>
  </g>
</svg>'''
    
    with open(svg_filepath, 'w', encoding='utf-8') as f:
        f.write(svg_content)
    print(f"Created fallback SVG: {svg_filename}")
