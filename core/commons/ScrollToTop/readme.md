# Description

ScrollToTop is module commons to show scroll to top function on desktop

## How To Install

**1. Import module to your component**
```node
import ScrollToTop from '@common_scrolltotop';
```

or

```node
import ScrollToTop from '{pathModule}/commons/ScrollToTop';
```

**2. Place ScrollToTop component on your component**

```node
....
<ScrollToTop storeConfig={storeConfig} />
....
```

### Properties
| Props       | Required | Description | Type |
| :---        | :---     | :---        |:---  |
| `storeConfig`       | true    | Configuration for determining whether we had to consider sticky top navbar (from Backoffice) | `object` |

