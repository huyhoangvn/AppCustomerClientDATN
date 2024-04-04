import { Picker } from '@react-native-picker/picker';
import React from 'react';
import { View, Text } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { appColors } from '../../constants/appColors';
import { appIcon } from '../../constants/appIcon';
import { appFontSize } from '../../constants/appFontSizes';

interface OptionPickerProps {
  option: string;
  onOptionChange: (option: string) => void;
  options: any[];
  optionTitle?: string;
  handleSave?: Function;
  mode?: 'dialog' | 'dropdown';
  titleHandleSave?: string;
  icon?: any;
}

const KhuyenMaiPicker: React.FC<OptionPickerProps> = ({ option, onOptionChange, options, optionTitle, handleSave, mode = "dialog", titleHandleSave="Lưu", icon }) => {

  const handleValueChange = (itemValue: any) => {
    // Find the selected option in the options array
    const selectedOption = options.find(option => option.idKM === itemValue);
    if (selectedOption) {
      onOptionChange(selectedOption);
    }
  };

  return (
    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 5}}>
      {optionTitle && (
        <Text style={{fontSize: appFontSize.normal, fontWeight: 'bold', color: appColors.warmOrange }}>
          {optionTitle}</Text>
      )}
      <View style={{flex: 1,flexDirection: 'row', alignItems: 'center', height: 40, borderWidth: 1, 
      borderRadius: 8, borderColor: appColors.boderColor, marginLeft: 5}}>
        {icon && <FontAwesomeIcon icon={icon} color={appColors.yellow} size={appIcon.normal} />}
        <Picker
          selectedValue={option}
          style={{minHeight: 50, maxHeight: 50, flex: 1, flexGrow: 1}}
          onValueChange={handleValueChange} // Use the new handler
          mode={mode}
        >
          {options.map((item: any) => (
            <Picker.Item key={item.idKM} label={item.tieuDe} value={item.idKM} style={{fontSize: 14}} />
          ))}
        </Picker>
      </View>
    </View>
  );
};

export default KhuyenMaiPicker;
