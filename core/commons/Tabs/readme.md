# Description

Tabs is module commons to create custom top tabs view

## How To Use

**Import module to your component**
```node
import Tabs from '@common_tabs';
```

**Sample Code**
```node
import Tabs from '@common_tabs';

<Tabs data={data} onChange={handleChange} allItems={false} />
```

**Sample Code with Tab Panel**

You can see in `core\modules\product\pages\default\components\DesktopTabs\index.js`

### Properties
| Props       | Required | Description | Type |
| :---        | :---     | :---        |:---  |
| `data`       | optional    | (`required` if `tabPanel` is `false`), data for render tabs label | `array` |
| `onChange`       | optional    | (`required` if `tabPanel` is `false`), function action every change or click item tabs | `function` |
| `allItems`       | optional    | (`required` if `tabPanel` is `false`), condition for make `all items` for first item tabs | `bool` |
| `tabPanel`    | optional | component for render content tabs PDP | `component` |
| `expandData` | optional | (`required` if `tabPanel` is `true`), data for render tabs label and content PDP | `array` |
| `ListReviews` | optional | (`required` if `tabPanel` is `true`), component for render reviews tabs PDP | `React.Component` |
| `smartProductTabs` | optional | component for render smart product tabs PDP | `object` |

