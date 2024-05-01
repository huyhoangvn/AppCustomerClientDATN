import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import NavProps from '../models/props/NavProps';
import { appColors } from '../constants/appColors';


const TermsServiceScreen: React.FC<NavProps> = ({navigation}) => {

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.main}>
        <Text style={styles.title}>Điều khoản Dịch vụ: </Text>
        <Text style = {styles.content}>
          1. Chấp Nhận Sử Dụng: Bằng cách truy cập hoặc sử dụng dịch vụ của chúng tôi, bạn đồng ý tuân thủ và ràng buộc bởi các điều khoản và điều kiện sau đây cùng với tất cả các quy định và điều kiện thực hiện đúng pháp luật...
        </Text>
        <Text style = {styles.content}>
          2. Dịch Vụ Cung Cấp: Chúng tôi cung cấp một nền tảng trực tuyến để giúp bạn đặt đồ ăn từ các nhà hàng hoặc cửa hàng thực phẩm địa phương. Chúng tôi không phải là nhà hàng hoặc cửa hàng thực phẩm và không chịu trách nhiệm về chất lượng hoặc an toàn của các sản phẩm được cung cấp bởi họ.
        </Text>
        <Text style = {styles.content}>
          3. Đặt Hàng và Thanh Toán: Khi sử dụng dịch vụ của chúng tôi để đặt hàng, bạn đồng ý thanh toán mọi khoản phí liên quan đến đơn đặt hàng của bạn. Chúng tôi có thể yêu cầu thông tin thanh toán để xác nhận đặt hàng của bạn và hoàn thành giao dịch.
        </Text>
        <Text style = {styles.content}>
          4. Hủy Đơn Hàng: Bạn có thể hủy đơn hàng của mình trước khi đơn hàng đó được xác nhận bởi nhà cung cấp. Sau khi đơn hàng được xác nhận, bạn có thể không thể hủy hoặc thay đổi nó. Chúng tôi giữ quyền quyết định cuối cùng về việc chấp nhận hoặc từ chối yêu cầu hủy đơn hàng.        </Text>
        <Text style = {styles.content}>
          5. Bảo Mật và Quyền Riêng Tư: Chúng tôi cam kết bảo vệ thông tin cá nhân của bạn và sử dụng nó chỉ cho mục đích cung cấp dịch vụ của chúng tôi. Chúng tôi không bán, chia sẻ hoặc tiết lộ thông tin cá nhân của bạn cho bất kỳ bên thứ ba nào mà không có sự đồng ý của bạn.
        </Text>
        <Text style = {styles.content}>
          6. Thay Đổi Điều Khoản: Chúng tôi có thể thay đổi hoặc cập nhật điều khoản và điều kiện này từ thời gian này sang thời gian khác để phản ánh các thay đổi trong dịch vụ hoặc pháp luật liên quan. Bằng cách tiếp tục sử dụng dịch vụ sau khi các thay đổi này có hiệu lực, bạn đồng ý tuân thủ và ràng buộc bởi các điều khoản và điều kiện mới.
        </Text>
        <Text style = {styles.content}>
        - Vui lòng liên hệ với chúng tôi nếu bạn có bất kỳ câu hỏi hoặc góp ý nào về các điều khoản và điều kiện này.
        </Text>
        <Text style = {styles.content}>
        - Cảm ơn bạn đã sử dụng ứng dụng đặt đồ ăn của chúng tôi!
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      paddingHorizontal: 20,

    },
    main: {
      flex: 1,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      color: appColors.primary,
      
    },
    content: {
        color: appColors.text,
        paddingVertical:5,
        fontStyle: 'italic'
    }
  });
  

export default TermsServiceScreen;
