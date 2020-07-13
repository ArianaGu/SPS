package com.google.sps.data;

public final class Comment {
  private final long id;
  private final String name;
  private final String content;
  private final String imageUrl;
  private final long timestamp;

  public Comment(long id, String name, String content, String imageUrl, long timestamp) {
    this.id = id;
    this.name = name;
    this.content = content;
    this.imageUrl = imageUrl;
    this.timestamp = timestamp;
  }
}