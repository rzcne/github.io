---
layout: default
title: 书评专栏
permalink: /books/
---

<div class="section-header">
    <div>
        <h2 class="section-title">书评专栏</h2>
    </div>
    <span style="font-size: 14px; color: #718096;">Book Reviews · 阅读重塑思维</span>
</div>

<div class="grid-wrapper">
    {% assign filtered_posts = site.categories.Books %}
    
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
