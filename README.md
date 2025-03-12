# @peralva/services

Services

[![NPM Version](https://img.shields.io/npm/v/%40peralva%2Fservices)](https://www.npmjs.com/package/@peralva/services?activeTab=versions)
[![GitHub Release Date](https://img.shields.io/github/release-date/peralva/npm-services)](https://github.com/peralva/npm-services/releases)
[![GitHub License](https://img.shields.io/github/license/peralva/npm-services)](https://github.com/peralva/npm-services?tab=MIT-1-ov-file#readme)
[![NPM Downloads](https://img.shields.io/npm/dm/%40peralva%2Fservices)](https://www.npmjs.com/package/@peralva/services)
[![NPM Publish](https://github.com/peralva/npm-services/actions/workflows/npm-publish.yml/badge.svg)](https://github.com/peralva/npm-services/actions/workflows/npm-publish.yml)

## Installation

```bash
npm install --save @peralva/services
```

## Usage

```ts
import { services } from '@peralva/services';

const response = await services({
	url: 'https://jsonplaceholder.typicode.com/posts',
	method: 'GET',
});

if (response.status === 200) {
	response.body.forEach((value) => {
		console.log(value.title);
	});
}
```
