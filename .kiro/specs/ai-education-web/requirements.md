# Requirements Document

## Introduction

An educational and interactive website designed to teach 8-9 year old children (3EP class) how AI works. The website will be used as a classroom teaching tool during a parent visit, covering AI training, computing resources, AI usage, and model customization through knowledge bases, context, and prompts. The content must be age-appropriate, visually engaging, and interactive to maintain the attention of young learners.

## Glossary

- **Website**: The interactive educational web application for teaching AI concepts to children
- **Learner**: An 8-9 year old child (3EP student) using the website
- **Presenter**: The adult (parent visiting the class) who navigates and presents the website content
- **Training_Module**: The section of the website that explains how AI models are trained
- **Resources_Module**: The section that explains the importance of computing resources in AI training
- **Usage_Module**: The section that explains how AI models are used in everyday life
- **Customization_Module**: The section that explains how AI models can be tuned with knowledge bases, context, and prompts
- **Interactive_Element**: A clickable, draggable, or animated component that allows learners to engage with the content
- **Visual_Metaphor**: An age-appropriate illustration or animation that represents a complex AI concept in simple terms
- **Navigation_System**: The component that allows the Presenter to move between sections of the website

## Requirements

### Requirement 1: Website Structure and Navigation

**User Story:** As a Presenter, I want a clear and simple navigation structure, so that I can guide the class through the AI topics in a logical order.

#### Acceptance Criteria

1. THE Website SHALL display a landing page with a welcoming title and a visual overview of the four main topics
2. THE Navigation_System SHALL provide clearly labeled buttons or visual indicators to move between the four main modules (Training, Resources, Usage, Customization)
3. WHEN the Presenter clicks a navigation element, THE Website SHALL transition to the selected module with a smooth visual animation
4. THE Website SHALL display a progress indicator showing which modules have been visited and which remain

### Requirement 2: AI Training Module

**User Story:** As a Presenter, I want to explain how AI models are trained using relatable examples, so that Learners understand the concept of teaching a computer through data.

#### Acceptance Criteria

1. THE Training_Module SHALL present the concept of AI training using a Visual_Metaphor of teaching a pet or a child to recognize objects
2. THE Training_Module SHALL include at least one Interactive_Element where Learners can "feed" example images to a simulated AI and observe it learning
3. WHEN a Learner provides example data to the simulated AI, THE Training_Module SHALL display a visual response showing the AI improving its recognition over time
4. THE Training_Module SHALL explain that AI learns from many examples, using specific numbers that children can relate to (e.g., "thousands of pictures of cats")
5. THE Training_Module SHALL use vocabulary and sentence structures appropriate for 8-9 year old children

### Requirement 3: Computing Resources Module

**User Story:** As a Presenter, I want to explain why AI needs powerful computers, so that Learners understand the scale of computing required for AI training.

#### Acceptance Criteria

1. THE Resources_Module SHALL present the concept of computing power using a Visual_Metaphor comparing AI training to a relatable large-scale task (e.g., reading all the books in a library)
2. THE Resources_Module SHALL include an Interactive_Element that lets Learners compare the speed of a single computer versus many computers working together
3. WHEN a Learner interacts with the comparison element, THE Resources_Module SHALL visually demonstrate how parallel computing speeds up AI training
4. THE Resources_Module SHALL use concrete, child-friendly comparisons for abstract numbers (e.g., "more computers than there are students in your school")
5. THE Resources_Module SHALL explain that training takes time and energy using relatable time scales

### Requirement 4: AI Usage Module

**User Story:** As a Presenter, I want to show how AI is used in everyday life, so that Learners can connect AI concepts to things they already know and use.

#### Acceptance Criteria

1. THE Usage_Module SHALL present at least four real-world examples of AI that children encounter (e.g., voice assistants, recommendation systems, photo filters, translation tools)
2. THE Usage_Module SHALL include an Interactive_Element where Learners can match AI applications to their everyday uses
3. WHEN a Learner correctly matches an AI application to its use, THE Usage_Module SHALL provide positive visual feedback with an animation or sound
4. THE Usage_Module SHALL explain the difference between AI training (slow, expensive) and AI usage (fast, accessible) using a simple Visual_Metaphor
5. THE Usage_Module SHALL present AI as a helpful tool that assists people rather than replaces them

### Requirement 5: AI Customization Module - Knowledge Bases

**User Story:** As a Presenter, I want to explain how AI can be given specific knowledge, so that Learners understand that AI can be specialized for different tasks.

#### Acceptance Criteria

1. THE Customization_Module SHALL explain knowledge bases using a Visual_Metaphor of giving a student a specific textbook to study from
2. THE Customization_Module SHALL include an Interactive_Element where Learners can select different "books" (knowledge bases) and see how the AI's answers change based on the selected knowledge
3. WHEN a Learner selects a different knowledge base, THE Customization_Module SHALL display different AI responses that clearly reflect the selected knowledge domain
4. THE Customization_Module SHALL use vocabulary appropriate for 8-9 year old children when explaining knowledge bases

### Requirement 6: AI Customization Module - Context

**User Story:** As a Presenter, I want to explain how context helps AI give better answers, so that Learners understand that AI responses depend on the information provided.

#### Acceptance Criteria

1. THE Customization_Module SHALL explain context using a Visual_Metaphor of giving someone background information before asking a question
2. THE Customization_Module SHALL include an Interactive_Element where Learners can add or remove context and observe how AI responses change
3. WHEN a Learner modifies the context provided to the simulated AI, THE Customization_Module SHALL update the AI response to reflect the new context within 1 second
4. THE Customization_Module SHALL demonstrate at least two examples showing how the same question produces different answers with different context

### Requirement 7: AI Customization Module - Prompts

**User Story:** As a Presenter, I want to explain how prompts guide AI behavior, so that Learners understand that the way you ask a question affects the answer you get.

#### Acceptance Criteria

1. THE Customization_Module SHALL explain prompts using a Visual_Metaphor of asking a question in different ways to get different types of answers
2. THE Customization_Module SHALL include an Interactive_Element where Learners can choose from pre-written prompts and see how the AI response changes
3. WHEN a Learner selects a different prompt style, THE Customization_Module SHALL display a visually distinct response that demonstrates the effect of prompt wording
4. THE Customization_Module SHALL provide at least three prompt variations for the same topic to illustrate how prompt engineering works
5. THE Customization_Module SHALL use simple, child-friendly language in all prompt examples

### Requirement 8: Visual Design and Accessibility

**User Story:** As a Presenter, I want the website to be visually appealing and easy to read for young children, so that Learners stay engaged throughout the presentation.

#### Acceptance Criteria

1. THE Website SHALL use large, readable fonts with a minimum text size equivalent to 18px for body content
2. THE Website SHALL use a bright, colorful design palette appropriate for 8-9 year old children
3. THE Website SHALL include illustrations or animations on every module page to support the educational content
4. THE Website SHALL maintain sufficient color contrast ratios (minimum 4.5:1) for all text content to ensure readability
5. THE Website SHALL be responsive and display correctly on a projected screen or large display used in a classroom setting
6. THE Website SHALL load all content without requiring user accounts or authentication

### Requirement 9: Interactivity and Engagement

**User Story:** As a Presenter, I want interactive elements throughout the website, so that Learners remain engaged and actively participate in learning.

#### Acceptance Criteria

1. THE Website SHALL include at least one Interactive_Element per module that requires Learner participation
2. WHEN a Learner completes an Interactive_Element successfully, THE Website SHALL provide immediate positive feedback through visual animation
3. THE Website SHALL include simple drag-and-drop or click-based interactions that do not require typing or reading complex instructions
4. IF a Learner provides an incorrect response to an Interactive_Element, THEN THE Website SHALL provide encouraging feedback and allow the Learner to try again
5. THE Website SHALL avoid timed challenges or competitive elements that could cause stress for young Learners
