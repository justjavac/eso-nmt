# eso-nmt

Neural machine translation (NMT) for Elder Scrolls Online(ESO).

基于人工神经网络将上古卷轴 OL 翻译为中文。

## 前置

- Python
- Perl
- Deno

## 安装

```bash
git clone https://github.com/moses-smt/mosesdecoder.git
git clone https://github.com/rsennrich/subword-nmt.git
```

除此之外，中文还需要分词工具

```bash
pip install jieba
```

### 中文分词

```bash
python3 -m jieba -d " " gamedata/lang/zh.txt > gamedata/lang/tok.zh
cp gamedata/lang/en.txt gamedata/lang/tok.en
```

### 学习 bpecode

```bash
python3 subword-nmt/subword_nmt/learn_joint_bpe_and_vocab.py -i gamedata/lang/tok.en -o gamedata/lang/bpecode.en --write-vocabulary gamedata/lang/voc.en
python3 subword-nmt/subword_nmt/learn_joint_bpe_and_vocab.py -i gamedata/lang/tok.zh -o gamedata/lang/bpecode.zh --write-vocabulary gamedata/lang/voc.zh
```

### bep 分词

```bash
python3 subword-nmt/subword_nmt/apply_bpe.py -c gamedata/lang/bpecode.en < gamedata/lang/tok.en > gamedata/lang/bpe.en
python3 subword-nmt/subword_nmt/apply_bpe.py -c gamedata/lang/bpecode.zh < gamedata/lang/tok.zh > gamedata/lang/bpe.zh
```

### 二值化(binarize)

```bash
python preprocess.py --source-lang en --target-lang zh --trainpref gamedata/lang/train --validpref=gamedata/lang/valid --testpref=gamedata/lang/test --destdir gamedata/lang/data-bin --joined-dictionary --workers 20
```
