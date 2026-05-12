---
category: General
---
# Large Language Models

# `Large Language Models`

Also known as LLMs.

## Theory

* Tokenizer: splits strings into tokens
* Lemmatization: reverts tokens to their root forms
* Encoder: makes each token a vector via embedding, shifts weights to capture meaning/context of tokens via attention
* Decoder: generates new text using encoded representations to predict next token in a sequence, can access current and previous encoder outputs
* Transformers: Encoder + Decoder

## Quickstart

LLMs are typically built upon the following infrastructure.

1. [Text Generation Interface (TGI)](https://huggingface.co/docs/text-generation-inference/en/index): framework that features optimized transformer code, quantization, accelerated weight loading and logits warping
2. [Hugging Face Transformers (HF)](https://github.com/huggingface/transformers): open-source library that provides many pre-trained models for NLP and other custom tasks
3. [Versatile Large Language Model (vLLM)](https://github.com/vllm-project/vllm): framework that features efficient memory management with paged attention, optimized CUDA kernels, decoding algorithms and high-performance serving throughput *(significantly outperforming TGI and HF)*

You can [train your own model](#train-your-own-model) or [use existing ones](#use-a-prebuilt-model).

## Train your own model

First, learn [Python](https://learnxinyminutes.com/docs/python/).

Optionally, learn [R](https://learnxinyminutes.com/docs/r/), [Julia](https://learnxinyminutes.com/docs/julia/), [C++](https://learnxinyminutes.com/docs/c++/), [Scala](https://learnxinyminutes.com/docs/scala/) and [Go](https://learnxinyminutes.com/docs/go/).

Then choose a library from below.

### Libraries

#### Python

* [PyTorch](https://pytorch.org/)
* [TensorFlow](https://www.tensorflow.org/)
* [Ollama](https://ollama.com/)
* [Hugging Face Transformers](https://huggingface.co/docs/transformers/en/index)
* [Natural Language Toolkit](https://www.nltk.org/)
* [spaCy](https://spacy.io/)
* [Aphrodite Engine](https://github.com/PygmalionAI/aphrodite-engine)

#### R

* [Tidyverse](https://www.tidyverse.org/packages/)
* [caret](https://topepo.github.io/caret/)
* [tm](https://cran.r-project.org/web/packages/tm/index.html)

#### Julia

* [Flux](https://fluxml.ai/Flux.jl/stable/)
* [MLJ](https://juliaai.github.io/MLJ.jl/dev/)

#### C++

* [Eigen](https://eigen.tuxfamily.org/index.php?title=Main_Page)
* [dlib](http://dlib.net/)
* [TensorFlow core](https://www.tensorflow.org/api_docs/cc)

#### Scala

* [MLlib](https://spark.apache.org/mllib/)
* [Breeze](https://github.com/scalanlp/breeze)
* [DeepLearning4j](https://deeplearning4j.konduit.ai/)
* [Weka](https://www.weka.io/)

#### Go

* [Hugot](https://github.com/knights-analytics/hugot)
* [Gorgonia](https://gorgonia.org/)

#### Language-agnostic

* [Ollama](https://ollama.com/)
* [TabbyAPI](https://github.com/theroyallab/tabbyAPI)

## Use a prebuilt model

In 2024, there are many existing LLM implementations to choose from. The more prominent ones have been listed below.

* [GPT-4](https://openai.com/index/gpt-4/)
  * OpenAI-developed
  * excellent at generating human-like text
* [Bidirectional Encoder Representations from Transformers (BERT)](https://research.google/pubs/bert-pre-training-of-deep-bidirectional-transformers-for-language-understanding/)
  * Google-developed
  * transformer-based model for a variety of NLP tasks
* [Megatron-LM](https://huggingface.co/docs/accelerate/en/usage_guides/megatron_lm)
  * NVIDIA-developed
  * scalable LLM framework for training and deploying models
* [Llama](https://llama.meta.com/)
  * Meta-developed
  * family of large language models for NLP and text generation
* [Fairseq](https://ai.meta.com/tools/fairseq/)
  * Meta-developed *(Facebook AI Research (FAIR))*
  * sequence-to-sequence learning toolkit for training and deploying models
  * used for translation, summarization and language modeling
* [AllenNLP](https://allenai.org/allennlp)
  * Allen Institute for AI-developed
  * open-source library built on PyTorch
  * used for NLP research and deploying NLP-focused models
* [Text-To-Text Transfer Transformer (T5)](https://huggingface.co/docs/transformers/en/model_doc/t5)
  * Google-developed
  * highly versatile model that frames all NLP tasks as converting text to text
* [Enhanced Representation through Knowledge Integration (ERNIE)](http://research.baidu.com/Blog/index-view?id=183)
  * Baidu-developed
  * incorporates knowledge graphs into the pre-training process for enhanced language comprehension
* [Universal Language Model Fine-tuning (ULMFiT)](https://paperswithcode.com/method/ulmfit)
  * fast.ai-developed
  * technique for fine-tuning pre-trained LLMs on downstream tasks
* [StarCoder](https://huggingface.co/bigcode/starcoder)
  * BigCode-developed
  * optimized for code generation and completion
* [BLOOM](https://huggingface.co/bigscience/bloom)
  * BigScience-developed
  * multilingual language model trained on many languages and tasks
* [GPT-NeoX](https://huggingface.co/docs/transformers/en/model_doc/gpt_neox)
  * EleutherAI-developed
  * designed to replicate GPT-3 architecture for various NLP tasks
* [Pythia](https://www.eleuther.ai/papers-blog/pythia-a-suite-for-analyzing-large-language-modelsacross-training-and-scaling)
  * EleutherAI-developed
  * family of models for large-scale NLP tasks
* [OpenAssistant](https://huggingface.co/OpenAssistant)
  * LAION-developed
  * conversational assistant for interactive AI dialogue capabilities
* [Dolly V2](https://huggingface.co/databricks/dolly-v2-12b)
  * Databricks-developed
  * high-performance commercial model for instruction-following tasks
* [StableLM](https://github.com/Stability-AI/StableLM)
  * Stability AI-developed
  * robust model for NLP tasks
* [LocalAI](https://localai.io/)
  * LocalAI-developed
  * facilitates local deployment of existing LLMs without relying on cloud-based services

## More on

* [Ollama](https://ollama.com/)
* [huggingface.co](https://huggingface.co/)
* [MachineLearning.md](./MachineLearning.md)
* [Open LLMs](https://github.com/eugeneyan/open-llms) Github repository
* [Awesome-LLM](https://github.com/Hannibal046/Awesome-LLM) Github repository
* [TGI vs vLLM](https://medium.com/@rohit.k/tgi-vs-vllm-making-informed-choices-for-llm-deployment-37c56d7ff705) by Rohit Kewalramani
* [Which is faster, vLLM, TGI or TensorRT?](https://www.reddit.com/r/LocalLLaMA/comments/1cb8i7f/which_is_faster_vllm_tgi_or_tensorrt/) Reddit post
