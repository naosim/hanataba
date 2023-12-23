# hanataba
モデリング課題「花束問題」をやってみる  
[NPO法人 IT勉強宴会 - 花束問題V1.2](https://www.benkyoenkai.org/contents/Bouquet1-2)

```mermaid
classDiagram
  class ユーザー{
    +ユーザーID ユーザID
    +string お客様名
  }
  ユーザー --> ユーザーID
  class ユーザーID{
  }
  class 仕入先{
    +仕入先コード 仕入先コード
    +string 仕入先名
  }
  仕入先 --> 仕入先コード
  class 仕入先コード{
  }
  class 単品{
    +花コード 花コード
    +any 花名
    +仕入先コード 仕入先コード
  }
  単品 --> 花コード
  単品 --> 仕入先コード
  class 花コード{
  }
  class 受注{
    +string 注文ID
    +Date お届け日
    +string 送り主氏名
    +string お届け先住所
    +string お届け先氏名
    +花束コード ご注文花束コード
    +boolean メッセージ要不要
    +string お届けメッセージ
    +ユーザーID ユーザID
  }
  受注 --> 花束コード
  受注 --> ユーザーID
  class 注文ID{
  }
  class 商品{
    +花束コード 花束コード
    +any 商品名
    +any 価格
    +単品と数[] 単品と数リスト
  }
  商品 --> 花束コード
  商品 --> 単品と数
  class 花束コード{
  }
  class 単品と数{
    +花コード 花コード
    +number 数
  }
  単品と数 --> 花コード
```