# Description

RatingStar is module commons to create view start rating

## How To Use

**1. Import module to your component**
```node
import RatingStar from '@common_ratingstar';
```

or

```node
import RatingStar from '{pathModule}/commons/RatingStar';
```

**2. Place RatingStar component on your component**

```node
....
<RatingStar value={10} maxValue={5} />
....
```

### Properties
| Props       | Required | Description | Type |
| :---        | :---     | :---        |:---  |
| `value`       | true    | number value of range | `number` |
| `maxValue`       | false    | max value of range | `number` |
| `sizeIcon`       | false    | number size icon star | `number` |
| `onChange` | optional | function to handle change value | `function` |
| `disabled` | optional | disable component | `boolean` |
| `miniSummary` | optional | show only one star | `boolean` |

