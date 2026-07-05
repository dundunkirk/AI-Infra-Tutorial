<template>
  <section class="lab-landing">
    <p class="lab-kicker">FIG_000 · learning log · notebooks first</p>

    <div class="lab-hero">
      <h1>LLM Lab<br><span>from Scratch</span></h1>
      <p class="lab-lede">
        Build a working understanding of machine learning and LLMs from math,
        notebooks, source reading, and small reproducible experiments.
      </p>
      <p class="lab-note">
        Personal notes for surviving the long path from calculus and probability to
        training loops, optimizers, transformers, and post-training.
      </p>

      <div class="lab-actions">
        <a class="lab-button lab-button-primary" href="/llm-lab/roadmap/roadmap">Start Roadmap</a>
        <a class="lab-button" href="/llm-lab/basis/micrograd">Read Notes</a>
      </div>
    </div>

    <section class="lab-section">
      <h2>How this works</h2>
      <div class="lab-copy">
        <p>
          The notes follow one loop: understand the problem, derive the minimum math,
          write a runnable notebook, then keep the artifact. The goal is not to collect
          links, but to make each idea executable.
        </p>
        <p>
        Markdown notes and Jupyter notebooks now live under the same topic folders.
        The site renders notebooks directly in the browser, so the original
        `.ipynb` file remains the source of truth.
        </p>
      </div>
    </section>

    <section class="lab-stats" aria-label="Current progress">
      <div>
      <span class="lab-stat-number">4</span>
      <span class="lab-stat-label">Folders</span>
      </div>
      <div>
        <span class="lab-stat-number">12</span>
        <span class="lab-stat-label">Week Plan</span>
      </div>
      <div>
        <span class="lab-stat-number">Python</span>
        <span class="lab-stat-label">Primary Runtime</span>
      </div>
      <div>
      <span class="lab-stat-number">.ipynb</span>
      <span class="lab-stat-label">Rendered Directly</span>
      </div>
    </section>

    <section class="lab-section">
      <div class="lab-section-head">
      <p class="lab-kicker">Folder map · notes and notebooks together</p>
      <h2>Current structure</h2>
      </div>

      <div class="lab-catalog">
      <a class="lab-card" href="/llm-lab/basis/micrograd">
        <span>basis/</span>
        <strong>Basics</strong>
        <em>Micrograd, XGBoost, gradients, MLE, and derivative notebooks</em>
      </a>
      <a class="lab-card" href="/llm-lab/math/convex-function-jensen-inequality">
        <span>math/</span>
        <strong>Math</strong>
        <em>Convexity, matrix norms, probability, KL divergence, and statistics</em>
      </a>
      <a class="lab-card" href="/llm-lab/optimizer/">
        <span>optimizer/</span>
        <strong>Optimizers</strong>
        <em>Schedulers, AdaGrad, RMSProp, Adam, AdamW, and PyTorch optimization</em>
      </a>
      <a class="lab-card" href="/llm-lab/roadmap/studyplan">
        <span>roadmap/</span>
        <strong>Roadmap</strong>
        <em>Study plans, resources, learning strategy, and execution checkpoints</em>
      </a>
      </div>
    </section>
  </section>
</template>
