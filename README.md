# URL Helpers
*A package of useful helpers for URLs.*

## Functions:
- `hasParams`;
- `isRequiredParam`;
- `isOptionalParam`;
- `mountEndpointParams`;
- `addQueryString`.

### hasParam
Verifies if exists parameter in a given endpoint.
```js
const endpoint = '/first-param/:value/second-param/:value'

hasParams(endpoint)
```
The code above will return `true`.

### isRequiredParam
Verifies if the param is required.
```js
const endpoint = '/first-param/:value/second-param/:value'
const firstParam = endpoint.substring(12, 17)

isRequiredParam(firstParam)
```
The code above will return `true`.

### isOptionalParam
Verifies if the param is optional.
```js
const endpoint = '/first-param/:value/:optional?'
const secondParam = endpoint.substring(19, 28)

isOptionalParam(secondParam)
```
The code above will return `true`.

### mountEndpointParams
Mounts all endpoint paramaters.
```js
const endpoint = '/first-param/:value/second-param/:value'
const mountedEndpoint = mountEndpointParams(endpoint, 'firstValue', 'secondValue')
```
The code above will return `'/first-param/firstValue/second-param/secondValue'`.

### addQueryString
Adds query strings to the given endpoint.
```js
const endpoint = '/users'
const queryStrings = {
  active: true,
  admin: false,
}
const fullURL = addQueryString(endpoint, queryStrings)
```
The code above will return `'/users?active=true&admin=false'`.
