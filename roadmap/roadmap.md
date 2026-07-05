# LLM Roadmap

> 原理和实践要一起推进：懂数学计算原理，也要能落到代码、源码和实验。

这份路线只保留当前真正要推进的主线。更细的周计划见：[LLM Study Plan](/roadmap/studyplan)。

## 当前策略

先快速入门，建立对 LLM 全流程的整体认识，再逐步深入每个模块的原理、源码和实践。

| 方向 | 当前安排 |
| --- | --- |
| 数学 | 速览 [深度学习的数学基础](https://space.bilibili.com/59807853/channel/collectiondetail?sid=462509)，已完成第一轮 |
| LLM | 先做 [NeetCode Build Your GPT](https://neetcode.io/practice/machine-learning)，再系统学习 [Stanford CS336](https://cs336.stanford.edu/spring2025/index.html) |
| RL | 先速览王树森深度强化学习，再补强化学习数学基础 |
| 基础补充 | 按需回看 D2L、Karpathy nanochat / nanoGPT / makemore / micrograd |

Karpathy 系列优先级暂时放低，作为补基础和补直觉的材料，不作为当前主线。

## 当前学习清单

| 学习内容 | 视频时长 | 预计时长 | 状态 |
| --- | --- | --- | --- |
| micrograd - Karpathy | 2h | 4h | 待完成 |
| 深度学习的数学基础 - 五道口纳什 | 8h | 16h | 学习中 |
| makemore - Karpathy | 7h | 14h | 待完成 |
| 强化学习的数学原理 | 11h | 22h | 待完成 |

## 主线顺序

| 阶段 | 要掌握的内容 |
| --- | --- |
| Backprop / PyTorch | 计算图、链式法则、梯度下降、最小 autograd |
| Mini Language Model | bigram、char-level LM、next-token prediction、cross entropy |
| Transformer / Tokenizer | self-attention、BPE、nanoGPT、Transformer block |
| LLM Data Flow | `input_ids`、`labels`、label shift、pretraining vs SFT |
| Qwen2 Source | embedding、attention、hidden states、logits、loss、RoPE、GQA、RMSNorm、KV cache |
| SFT / LoRA | chat template、padding、label mask、PEFT、LLaMA-Factory |
| Infra | profiling、参数量、显存、KV cache、并行、prefill / decode |
| RL for LLM | reward model、policy gradient、PPO、GRPO、REINFORCE、veRL |
| Applications | RAG、Agent、Text2SQL |

## 路线参考

| 资料 | 用法 |
| --- | --- |
| [modern_ai_for_beginners](https://github.com/chunhuizhang/modern_ai_for_beginners) | 中文 AI/LLM 学习路线参考 |
| [modern_genai_bilibili](https://github.com/wdkns/modern_genai_bilibili) | 现代生成式 AI 路线和资料补充 |
| [偷星九月333 - 大模型路线](https://www.bilibili.com/opus/1184813741324107780?spm_id_from=333.1387.0.0) | 大模型学习路线参考 |
| [偷星九月333 - RL 路线](https://www.bilibili.com/opus/1186646296518197257?spm_id_from=333.1387.0.0) | RL 学习路线参考 |
| [Karpathy nn-zero-to-hero](https://github.com/karpathy/nn-zero-to-hero) | micrograd、makemore、nanoGPT 主线 |
| [AI Engineering from Scratch](https://github.com/rohitg00/ai-engineering-from-scratch) | 全局知识地图参考 |

## 推荐资料

### 数学基础

| 资料 | 用法 |
| --- | --- |
| [深度学习的数学基础](https://space.bilibili.com/59807853/channel/collectiondetail?sid=462509) | 补微积分、线性代数、概率统计 |
| [动手学深度学习](https://zh.d2l.ai/index.html) | 补 PyTorch、神经网络和训练基础 |

### LLM 主线

| 资料 | 用法 |
| --- | --- |
| [Karpathy nn-zero-to-hero](https://github.com/karpathy/nn-zero-to-hero) | 从 micrograd、makemore 到 nanoGPT |
| [Andrej Karpathy YouTube](https://www.youtube.com/@AndrejKarpathy) | 建立反向传播、语言模型和 Transformer 直觉 |
| [Stanford CS336](https://cs336.stanford.edu/spring2025/index.html) | LLM from scratch、tokenization、architecture、systems、alignment |
| [learnllm.ai](https://learnllm.ai/) | 查漏补缺和路线对照 |

### Transformer 与源码

| 资料 | 用法 |
| --- | --- |
| [Natural Language Processing with Transformers](https://www.oreilly.com/library/view/natural-language-processing/9781098103231/) | 理解 HuggingFace 和 Transformers 工作流 |
| [HuggingFace Transformers](https://github.com/huggingface/transformers) | 阅读 Qwen2 等 decoder-only LLM 实现 |

### SFT / LoRA

| 资料 | 用法 |
| --- | --- |
| [PEFT](https://github.com/huggingface/peft) | 理解 LoRA adapter 和参数高效微调 |
| [LLaMA-Factory](https://github.com/hiyouga/LLaMA-Factory) | 对照完整 SFT / LoRA 工程流程 |

### Infra

| 资料 | 用法 |
| --- | --- |
| [Stanford CS336](https://cs336.stanford.edu/spring2025/index.html) | GPU、profiling、parallelism、inference |
| modern_ai_for_beginners PyTorch distributed | 理解分布式训练和并行基础 |

### RL

| 资料 | 用法 |
| --- | --- |
| [OpenAI Spinning Up RL Intro](https://spinningup.openai.com/en/latest/spinningup/rl_intro.html) | 只看 RL 基础概念和 policy gradient 直觉 |
| [强化学习的数学原理](https://github.com/MathFoundationRL/Book-Mathematical-Foundation-of-Reinforcement-Learning) | 选修，深入理解 RL 数学推导 |
| [李宏毅 DRL](https://www.youtube.com/watch?v=z95ZYgPgXOY&list=PLJV_el3uVTsODxQFgzMzPLa16h6B8kWM_) | 补强化学习直觉 |
| [RL4LLM B站](https://space.bilibili.com/59807853/channel/collectiondetail?sid=4048984) | 对齐 LLM 后训练视角 |
| [veRL](https://github.com/volcengine/verl) | 阅读 `core_algos.py`，理解 PPO / GRPO 实现 |

## 记录入口

- 论文阅读记录：[Google Sheet](https://docs.google.com/spreadsheets/d/1fOf2QWTIMEZQ6Ndf0ZkRkzcOMg4mObvDi8Xs6YHLjaM/edit?gid=0#gid=0)
- 公开笔记站点：[llm-lab](https://zeztzchen.github.io/llm-lab/)
- 代码练习：[neetcode machine learning](https://neetcode.io/practice/machine-learning)

## 暂时低优先级

- 五道口纳什 PyTorch 求导系列
- RAG / Agent / Text2SQL
- 完整传统 RL 分支
- 全知识浏览型资料
