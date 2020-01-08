import Redis from 'ioredis';

class Cache {
  constructor() {
    this.redis = new Redis({
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      keyPrefix: 'cache:',
    });
  }

  // Put in cache
  set(key, value) {
    // Redis not allow objects vectores, necessary converter
    // param 'EX' inform to value expire
    // Last param time in seconds
    return this.redis.set(key, JSON.stringify(value), 'EX', 60 * 60 * 24);
  }

  // Return cache
  async get(key) {
    const cached = await this.redis.get(key);

    return cached ? JSON.parse(cached) : null;
  }

  // Delete key cache
  invalidade(key) {
    return this.redis.del(key);
  }

  async invalidadePrefix(prefix) {
    // Falha no redis, necessário colocar a palavra 'cache'
    const keys = await this.redis.keys(`cache:${prefix}:*`);

    const keysWithoutPrefix = keys.map(key => key.replace('cache:', ''));

    return this.redis.del(keysWithoutPrefix);
  }
}

export default new Cache();
