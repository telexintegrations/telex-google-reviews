# Telex Google Reviews Integration

This integration enables real-time monitoring of Google Business Reviews directly in Telex channels, helping teams stay informed about customer feedback and maintain prompt response times.

![Telex Channel Integration](https://github.com/telexintegrations/telex-google-reviews/blob/master/README/image.png)

## Features

- Automated Google Business Reviews fetching
- Real-time Telex channel notifications
- Star rating visualization
- Configurable update intervals

## Usage

1. Add the integration using `https://telex-google-reviews.onrender.com/api/v1/integration.json`
2. [Search for your business place ID](https://developers.google.com/maps/documentation/javascript/examples/places-placeid-finder)
3. Copy the place ID and save it in the integration settings
4. Set your desired interval

## Running Locally

### Prerequisites

- Google Cloud Platform account
- Google Places API enabled
- Storage (Redis, SQL, e.t.c)

### Setup Instructions

1. **Google API Configuration**

   - Create a project in Google Cloud Console
   - Enable Places API
   - Generate API credentials
   - Copy the API key

2. **Redis Setup**

   - Create an Upstash Redis database
   - Copy the connection token

3. **Environment Configuration**

   ```env
   GOOGLE_PLACES_API_KEY="your-api-key"
   REDIS_TOKEN="your-redis-token"
   ```

4. **Integration Setup**

   ```bash
   # Install dependencies
   pnpm install

   # Start development server
   pnpm dev

   ```

### Deployment

1. Configure `integration.json` with your settings
2. Deploy the integration
3. Add the integration to your Telex channel

## Roadmap

- [x] Initial release with basic review fetching
- [x] Telex channel integration
- [x] Basic notification formatting
- [x] Fix review sorting
- [x] Fix display on telex marketplace
- [ ] Direct links to reviews
- [x] Error handling improvements
- [ ] Rate limiting
- [ ] Multi-location support
- [ ] Review response capabilities
- [ ] Advanced filtering options

## Support

For issues and feature requests, please use the GitHub issues tracker.
