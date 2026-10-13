# Bài thực hành Web3 - DominionDAO

Repo gồm 2 bài:

- `smartcontract/`: Bài 1 - tạo và deploy smart contract bằng Hardhat
- `web/`: Bài 2 - giao diện web3 bằng React

## Bài 1: Smartcontract

```bash
cd smartcontract
npm install
```

Tạo file `.env` trong thư mục `smartcontract` với nội dung (private key không có `0x`):

```
PRIVATE_KEY=your_private_key_here
```

Deploy lên mạng Sepolia:

```bash
npx hardhat run scripts/sample-script.js --network sepolia
```

## Bài 2: Web3

```bash
cd web
npm install
```

Tạo file `.env` trong thư mục `web` với địa chỉ contract đã deploy:

```
REACT_APP_CONTRACT_ADDRESS=0x17A22c154d2808AAB052F2Ace06C7781b1B4B1Ec
```

Chạy ứng dụng:

```bash
npm start
```

Mở http://localhost:3000, cài MetaMask và chuyển sang mạng Sepolia.