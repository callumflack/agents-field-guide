export const guideSite = 'https://afg.callum.website';

export const guideNavigation = [
  "index",
  "changelog",
  {
    "label": "Skills",
    "segment": "/skills",
    "landing": "/skills/",
    "collapsed": true,
    "items": [
      "skills/skills-i-publish",
      {
        "autogenerate": {
          "directory": "skills"
        }
      }
    ]
  },
  {
    "label": "Prompts",
    "segment": "/prompts",
    "landing": "/prompts/",
    "collapsed": true,
    "items": [
      "prompts/ask-for-proof-of-work",
      "prompts/find-implicit-state-machines",
      {
        "autogenerate": {
          "directory": "prompts"
        }
      }
    ]
  },
  {
    "label": "Playbooks",
    "segment": "/methods",
    "landing": "/methods/",
    "collapsed": true,
    "items": [
      "methods/design-modules-around-hidden-decisions",
      "methods/spacex-five-step-build-process",
      "methods/leave-room-for-plausible-corrections",
      "methods/twelve-rules-for-agentic-coding",
      "methods/understand-an-existing-product",
      "methods/breadboard-to-proof",
      "methods/prove-the-user-outcome",
      "methods/recover-drifting-work",
      "methods/independently-valuable-steps",
      "methods/turn-repeatable-agent-work-into-a-script",
      "methods/give-the-agent-a-way-to-verify",
      "methods/give-a-long-task-a-worklog",
      "methods/coordinate-work-in-codex",
      "methods/give-a-job-to-a-specialist",
      "methods/automate-agreed-rules"
    ]
  },
  {
    "label": "Field reports",
    "segment": "/field-reports",
    "landing": "/field-reports/",
    "items": [
      "field-reports/t3-code-experiment",
      "field-reports/why-i-turned-off-automatic-agent-memory",
      "field-reports/agentsview-learning"
    ]
  },
  {
    "label": "References",
    "segment": "/references",
    "landing": "/references/",
    "collapsed": true,
    "items": [
      "references/no-silver-bullet",
      "references/decomposing-systems-into-modules",
      "references/what-toyota-reveals-about-organising-agents",
      "references/production-leveling",
      "references/demand-side-thinking",
      "references/breadboards-and-fat-marker-sketches",
      "references/four-dark-corners-of-requirements-engineering",
      "references/towards-self-driving-codebases",
      "references/topology-of-an-llm-agent-loop",
      "references/case-against-formal-verification"
    ]
  },
  {
    "label": "Tools I use",
    "segment": "/tools",
    "landing": "/tools/",
    "collapsed": true,
    "items": [
      {
        "label": "Scrawl",
        "link": "https://scrawl.kitlangton.com/"
      },
      {
        "label": "Hex",
        "link": "https://github.com/anomalyco/hex"
      },
      {
        "label": "2password",
        "link": "https://github.com/kitlangton/2password"
      }
    ]
  }
];

export const categoryGroups = guideNavigation.filter(item => typeof item === 'object' && 'segment' in item);

export const legacyRedirects = {
  "/external-skills": "/skills/",
  "/external-skills/test-audit": "/skills/test-audit/",
  "/experiments": "/field-reports/",
  "/examples": "/methods/",
  "/skills-i-publish": "/skills/skills-i-publish/",
  "/ask-for-proof-of-work": "/prompts/ask-for-proof-of-work/",
  "/find-implicit-state-machines": "/prompts/find-implicit-state-machines/",
  "/five-step-build-process": "/methods/spacex-five-step-build-process/",
  "/methods/five-step-build-process": "/methods/spacex-five-step-build-process/",
  "/leave-room-for-plausible-corrections": "/methods/leave-room-for-plausible-corrections/",
  "/twelve-rules-for-agentic-coding": "/methods/twelve-rules-for-agentic-coding/",
  "/understand-an-existing-product": "/methods/understand-an-existing-product/",
  "/breadboard-to-proof": "/methods/breadboard-to-proof/",
  "/prove-the-user-outcome": "/methods/prove-the-user-outcome/",
  "/recover-drifting-work": "/methods/recover-drifting-work/",
  "/independently-valuable-steps": "/methods/independently-valuable-steps/",
  "/turn-repeatable-agent-work-into-a-script": "/methods/turn-repeatable-agent-work-into-a-script/",
  "/give-the-agent-a-way-to-verify": "/methods/give-the-agent-a-way-to-verify/",
  "/give-a-long-task-a-worklog": "/methods/give-a-long-task-a-worklog/",
  "/coordinate-work-in-codex": "/methods/coordinate-work-in-codex/",
  "/give-a-job-to-a-specialist": "/methods/give-a-job-to-a-specialist/",
  "/automate-agreed-rules": "/methods/automate-agreed-rules/",
  "/t3-code-experiment": "/field-reports/t3-code-experiment/",
  "/why-i-turned-off-automatic-agent-memory": "/field-reports/why-i-turned-off-automatic-agent-memory/",
  "/agentsview-learning": "/field-reports/agentsview-learning/",
  "/what-toyota-reveals-about-organising-agents": "/references/what-toyota-reveals-about-organising-agents/",
  "/production-leveling": "/references/production-leveling/",
  "/demand-side-thinking": "/references/demand-side-thinking/",
  "/four-dark-corners-of-requirements-engineering": "/references/four-dark-corners-of-requirements-engineering/",
  "/towards-self-driving-codebases": "/references/towards-self-driving-codebases/",
  "/topology-of-an-llm-agent-loop": "/references/topology-of-an-llm-agent-loop/",
  "/case-against-formal-verification": "/references/case-against-formal-verification/"
};
