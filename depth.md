---
layout: default
title: 深度报道
permalink: /depth/
---

<div class="section-header">
    <div>
        <h2 class="section-title">深度报道</h2>
    </div>
    <span style="font-size: 14px; color: #718096;">Deep Reporting · 抵达真相的底层逻辑</span>
</div>

<div class="grid-wrapper">
    {% assign filtered_posts = site.categories.Depth %}
    
    {% if filtered_posts.size > 0 %}
        {% for post in filtered_posts %}
        <article class="news-card">
            <a href="{{ post.url | relative_url }}" class="card-img-wrapper">
                <img src="{{ post.image }}" alt="{{ post.title }}" loading="lazy">
            </a>
            <div class="card-body">
                <div class="card-category">{{ post.category }}</div>
                <a href="{{ post.url | relative_url }}">
                    <h3 class="card-title">{{ post.title }}</h3>
                </a>
                <p class="card-summary">{{ post.description }}</p>
                <div class="card-meta">
                    <span>{{ post.author }}</span>
                    <span>{{ post.date | date: "%Y-%m-%d" }}</span>
                </div>
            </div>
        </article>
        {% endfor %}
    {% else %}
        <p style="grid-column: 1 / -1; text-align: center; color: #888; padding: 40px;">该栏目下暂无文章。</p>
    {% endif %}
</div>
