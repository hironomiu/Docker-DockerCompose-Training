# Docker-DockerCompose-Training

## 公式ドキュメント

[docker docs](https://docs.docker.com/)

## 動作環境

[Docker](https://www.docker.com/)、[Docker Compose](https://docs.docker.com/compose/)が動作すること([Docker Desktop](https://www.docker.com/get-started)で可能)

## recipe

- [recipe-1](./recipe-1/README.md)
  1. Docker で環境構築
     1. docker exec で接続し開発
     1. VSCode から接続し開発
     1. Docker の基本的な操作
  2. Docker Compose で環境構築
     1. Docker をマウントし開発
     1. VSCode から接続し開発
     1. Docker Compose の基本的な操作
- [recipe-2](./recipe-2/README.md)
  1. 全体を通して Docker、Docker Compose の基本的な使い方の理解
  2. 全体を通して VSCode から Docker コンテナに接続しアプリケーションコードを作成
  3. docker を用いてフロントサーバ、API サーバをたて連携(Part 1)
  4. 3 の環境構築を Docker Compose で行う(Part 2)
  5. (Training) 4 で改めて環境構築した環境で 3 のアプリを実装(Part 3)し他の機能も追加する
- [recipe-2-1](./recipe-2-1/README.md)
  1. [recipe-2](./recipe-2/README.md) に MySQL を追加
- [recipe-x](./recipe-x/README.md)
  1. Docker で MySQL を起動し接続
