# Description

AlertWithIcon

## How To Use

**Sample Code**
```node
import AlertWithIcon from '@common_alertwithicon';

const Component = () => {
    return (
        <>
            <AlertWithIcon severity="warning">
                Loremp sample content accordion
            </AlertWithIcon>
        </>
    );
}

export default Component;
```

### Properties
| Props       | Required | default | Description | Type |
| :---        | :---     |:---- | :---        |:---  |
| `severity`    | `false` | saverity variant color alert with value `success`, `error`, or `warning` | `success` | `string` |
| `children` | `required` | childre alert can be value `string` or `element` | | `string` or `React Element`|
| `className` | `false` | Custom classname alet wrapper |  | `string`|
| `classChildren` | `false` | Custom classname classChildren wrapper |  | `string`|
| `CustomIcon` | `false` | Custom component icon |  | `component`|