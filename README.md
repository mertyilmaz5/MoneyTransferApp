# React Native Payment Demo

Bu proje, React Native kullanarak basit bir ödeme senaryosunu simüle eden bir mobil uygulamadır. Uygulama, kullanıcıların giriş yaparak hesaplarını seçmelerine, tutar belirlemelerine ve ödeme işlemi yapmalarına olanak tanır. Aynı zamanda NFC tarama simülasyonu ve backend bağlantıları için örnekler içerir.

## Özellikler

- Kullanıcı Girişi
- Gönderen Hesap Listesi
- Tutar Girişi
- QR Kod ile Gönderici Bilgisi
- Veri Şifreleme
- NFC Tarama Simülasyonu
- Alıcı Hesap Listesi
- Ödeme Onayı ve Bildirimi

## Kurulum

### Gereksinimler

- Node.js
- npm veya yarn
- React Native CLI
- Android Studio veya Xcode (platforma göre, projede mevcut değil)

### Adımlar

1. **Depoyu klonlayın**

   ```bash
   git clone https://github.com/mertyilmaz5/MoneyTransferApp.git
   cd MoneyTransferApp
   ```

2. **Bağımlılıkları yükleyin**

   ```bash
   npm install
   # veya
   yarn install
   ```

3. **Android veya iOS projesini hazırlayın**

   Expo Go:

   ```bash
   npm start -c
   ```

   Android(projede mevcut değil):

   ```bash
   npx react-native run-android
   ```

   iOS(projede mevcut değil):

   ```bash
   npx pod-install
   npx react-native run-ios
   ```

## Kullanım

### Ekranlar ve Fonksiyonlar

#### 1. LoginScreen

Kullanıcı adı ve şifre giriş alanları ile birlikte "Giriş" butonu bulunur. Giriş yapıldığında `TransferListScreen` ekranına yönlendirir.

#### 2. TransferListScreen

Veritabanında tanımlanmış gönderen hesapları listeler. Tutar girişi yapılabilen bir alan ve "Onay" butonu bulunur. Hesap seçilip tutar girildikten sonra `TransferRequestScreen` ekranına yönlendirir.

#### 3. TransferRequestScreen

Seçilen gönderen hesap bilgileri özetlenir ve QR kod olarak gösterilir. "NFC ile Ödeme" butonuna tıklayınca NFC tarama simülasyonu başlatılır ve alıcı seçimi için `RecipientList` modalı açılır.

#### 4. RecipientList

Veritabanında tanımlanmış alıcı hesapları listeler. Alıcı seçilip "Onayla" butonuna tıklanınca `ConfirmationScreen` ekranına yönlendirir.

#### 5. ConfirmationScreen

Gönderen, alıcı ve tutar bilgilerini özetler. "Onayla" veya "Reddet" butonları bulunur. Onaylanınca para aktarım işlemi gerçekleşir ve `ReceiverScreen` ekranına yönlendirir.

#### 6. ReceiverScreen

Ödeme işleminin başarıyla gerçekleştiğini gösterir ve ödeme bilgilerini özetler ve `TransferListScreen` ekranına döner.

### Örnek NFCScanner.js, Hashing.js ve Backend Bağlantıları

Uygulamada NFC bağlantısı ve veri şifreleme fonksiyonları simüle edilmiştir. Backend bağlantıları ve API dosyaları proje dizinine eklenmiştir.

## Katkıda Bulunma

Katkıda bulunmak isterseniz, lütfen bir fork yapın, branş oluşturun, değişikliklerinizi yapın ve bir pull request gönderin.

1. **Fork**: `https://github.com/mertyilmaz5/MoneyTransferApp/fork`
2. **Branş oluşturun**: `git checkout -b feature/AmazingFeature`
3. **Değişikliklerinizi yapın**: `git commit -m 'Add some AmazingFeature'`
4. **Branşa push yapın**: `git push origin feature/AmazingFeature`
5. **Pull request açın**

## Lisans

Bu proje MIT Lisansı ile lisanslanmıştır. Daha fazla bilgi için LICENSE dosyasına bakınız.

## Uygulama İşlevselliği

Bu uygulama, kullanıcıların banka hesaplarını yönetmelerini ve finansal işlemlerini kolayca yapmalarını sağlamak amacıyla tasarlanmıştır. Her bir ekran, belirli bir işlevi yerine getirirken kullanıcı dostu arayüz tasarımı ve etkili veri yönetimi ile geliştirilmiştir. Kullanıcılar, bu uygulama sayesinde banka işlemlerini hızlı, güvenli ve kullanıcı dostu bir şekilde gerçekleştirebilirler.

## Demo Video

<div align="center">
  <video src="https://github.com/mertyilmaz5/MoneyTransferApp/assets/70209008/919aeafb-f3d1-4276-a126-780c4fee98dd" width="200" height="500"/>
</div>

## Screenshots

<p align="center">
  <img src="https://github.com/mertyilmaz5/MoneyTransferApp/assets/70209008/54c43ed9-b7b9-4d81-8c34-76ea444353ad" width="200" height="400">
  <img src="https://github.com/mertyilmaz5/MoneyTransferApp/assets/70209008/51220582-09d7-4c57-b395-b64bc7f0e0e2" width="200" height="400">
  <img src="https://github.com/mertyilmaz5/MoneyTransferApp/assets/70209008/92db2092-f35c-46b6-bbcb-8b4e96e71855" width="200" height="400">
  <img src="https://github.com/mertyilmaz5/MoneyTransferApp/assets/70209008/c3069be8-9b8b-406b-9a88-1197086719b1" width="200" height="400">
  <img src="https://github.com/mertyilmaz5/MoneyTransferApp/assets/70209008/c381cadf-d960-49a9-9c65-24bf42049220" width="200" height="400">
  <img src="https://github.com/mertyilmaz5/MoneyTransferApp/assets/70209008/b922f17f-2ab4-43c2-90b9-8af9f3be8039" width="200" height="400">
  <img src="https://github.com/mertyilmaz5/MoneyTransferApp/assets/70209008/1d5a865a-7c02-4413-bae0-6d73186a31e8" width="200" height="400">
  <img src="https://github.com/mertyilmaz5/MoneyTransferApp/assets/70209008/ae0192d1-fd0d-4cc7-b913-b1bfebe93220" width="200" height="400">
</p>

