Tabii, aşağıda bu proje için detaylı bir README dosyası bulabilirsiniz:

---

# React Native Payment Demo

Bu proje, React Native kullanarak basit bir ödeme senaryosunu simüle eden bir mobil uygulamadır. Uygulama, kullanıcıların giriş yaparak hesaplarını seçmelerine, tutar belirlemelerine ve ödeme işlemi yapmalarına olanak tanır. Uygulama aynı zamanda NFC tarama simülasyonu ve backend bağlantıları için örnekler içerir.

## Özellikler

- Kullanıcı Girişi
- Gönderen Hesap Listesi
- Tutar Girişi
- QR Kod ile Gönderici Bilgisi
- NFC Tarama Simülasyonu
- Alıcı Hesap Listesi
- Ödeme Onayı ve Bildirimi

## Kurulum

### Gereksinimler

- Node.js
- npm veya yarn
- React Native CLI
- Android Studio veya Xcode (platforma göre)

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

   Android:

   ```bash
   npx react-native run-android
   ```

   iOS:

   ```bash
   npx pod-install
   npx react-native run-ios
   ```

## Kullanım

### Ekranlar ve Fonksiyonlar

#### 1. LoginScreen

Kullanıcı adı ve şifre giriş alanları ile birlikte "Giriş" butonu bulunur. Giriş yapıldığında `TransferListScreen` ekranına yönlendirir.

#### 2. TransferListScreen

Statik olarak tanımlanmış gönderen hesapları listeler. Tutar girişi yapılabilen bir alan ve "Onay" butonu bulunur. Hesap seçilip tutar girildikten sonra `TransferRequestScreen` ekranına yönlendirir.

#### 3. TransferRequestScreen

Seçilen gönderen hesap bilgileri özetlenir ve QR kod olarak gösterilir. "NFC ile Ödeme" butonuna tıklayınca NFC tarama simülasyonu başlatılır ve alıcı seçimi için `RecipientList` modalı açılır.

#### 4. RecipientList

Statik olarak tanımlanmış alıcı hesapları listeler. Alıcı seçilip "Onayla" butonuna tıklanınca `ConfirmationScreen` ekranına yönlendirir.

#### 5. ConfirmationScreen

Gönderen, alıcı ve tutar bilgilerini özetler. "Onayla" veya "Reddet" butonları bulunur. Onaylanınca 3 saniye bekler ve `ReceiverScreen` ekranına yönlendirir.

#### 6. ReceiverScreen

Ödeme işleminin başarıyla gerçekleştiğini gösterir ve ödeme bilgilerini özetler. "Ana Sayfaya Dön" butonuna tıklayarak `TransferListScreen` ekranına döner.

### Örnek NFCScanner.js ve Backend Bağlantıları

Uygulamada NFC ve backend bağlantıları simüle edilmiştir. `NFCScanner.js` ve backend bağlantıları için örnek kodlar `services` klasöründe bulunmaktadır.

## Katkıda Bulunma

Katkıda bulunmak isterseniz, lütfen bir fork yapın, branş oluşturun, değişikliklerinizi yapın ve bir pull request gönderin.

1. **Fork**: `https://github.com/mertyilmaz5/MoneyTransferApp/fork`
2. **Branş oluşturun**: `git checkout -b feature/AmazingFeature`
3. **Değişikliklerinizi yapın**: `git commit -m 'Add some AmazingFeature'`
4. **Branşa push yapın**: `git push origin feature/AmazingFeature`
5. **Pull request açın**

## Lisans

Bu proje MIT Lisansı ile lisanslanmıştır. Daha fazla bilgi için LICENSE dosyasına bakınız.

---

Bu README dosyası, projeyi klonlayan ve çalıştırmak isteyen geliştiricilere kapsamlı bir rehberlik sağlar.
