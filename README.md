# hanataba
モデリング課題「花束問題」をやってみる  
[NPO法人 IT勉強宴会 - 花束問題V1.2](https://www.benkyoenkai.org/contents/Bouquet1-2)

```mermaid

flowchart LR
subgraph domain
subgraph お客様_mjs
お客様["お客様<hr>+お客様ID お客様ID
+string お客様氏名<hr>"]
end
end
  お客様 --&gt; お客様ID
subgraph domain
subgraph お客様_mjs
お客様ID["お客様ID<hr><hr>"]
end
end
subgraph domain
subgraph お客様_mjs
お客様Repository["お客様Repository
**abstract**<hr><hr>+void 入会する()
+boolean 認証する()
+お客様 お客様を取得する()"]
end
end
  お客様Repository --&gt; お客様
subgraph domain
subgraph 在庫_mjs
在庫["在庫<hr>+在庫ID 在庫ID
+花コード 花コード
+Date 納品日
+Date 品質維持期限日<hr>"]
end
end
  在庫 --&gt; 在庫ID
  在庫 --&gt; 花コード
subgraph domain
subgraph 在庫_mjs
在庫ID["在庫ID<hr><hr>"]
end
end
subgraph domain
subgraph 注文_mjs
注文["注文<hr>+注文ID 注文ID
+Date お届け日
+string 送り主氏名
+string お届け先住所
+string お届け先氏名
+花束コード ご注文花束コード
+boolean メッセージ要不要
+string | null お届けメッセージ
+お客様ID お客様ID<hr>"]
end
end

  
```