import React, {useState} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import {View, Text, StyleProp, ViewStyle} from 'react-native';

interface Props {
  label?: string;
  value?: string;
  placeholder?: string;
  containerStyle: StyleProp<ViewStyle>;
  items?: {label: string; value: string}[];
  defaultValue?: string;
  onChangeItem: (item: string | null) => void; // Change the type of the parameter to string | null
}

const DropDownComponent = (props: Props) => {
  const {
    value,
    items,
    defaultValue,
    onChangeItem,
    containerStyle,
    placeholder,
    ...otherProps
  } = props;
  const [open, setOpen] = useState(false);
  // const [selectedValue, setSelectedValue] = useState<string | null>(
  //   value || defaultValue || null,
  // );
  const [selectedValue, setSelectedValue] = useState(
   ''
  );


  const handel = (value: any) => {
      onChangeItem(value);
  }

  return (
    <DropDownPicker
      open={open}
      value={selectedValue}
      items={items || []}
      setOpen={setOpen}
      setValue={setSelectedValue}
      multiple={false}
      zIndex={9999}
      style={{backgroundColor: '#fafafa', borderRadius: 30}}
      containerStyle={[containerStyle]}
      onSelectItem={(value) => handel(value)}
      placeholder={placeholder}
      {...otherProps}
    />
  );
};

export default DropDownComponent;
