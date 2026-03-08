# Red Teaming LLMs

# `Red Teaming LLMs`

Systematic adversarial testing methodology for identifying and mitigating security vulnerabilities in LLM systems.

## Quickstart

* Deliberate adversarial testing to uncover vulnerabilities in language model systems before malicious exploitation
* Systematically probes for weaknesses such as bias, harmful content generation, data leakage, and manipulation susceptibility
* Essential security practice for organizations deploying LLMs in production environments
* Combines offensive security techniques with AI safety evaluation methodologies
* Enables proactive vulnerability discovery and remediation rather than reactive incident response

## Attack Taxonomy and Threat Model

### Prompt-based attacks

#### Prompt Injection

1. Direct manipulation of model inputs to alter intended behavior
2. System prompt hijacking through user input channels
3. Instruction following exploitation bypassing safety mechanisms
4. Context window poisoning via embedded malicious instructions

#### Jailbreaking

1. Systematic circumvention of model safety training and guardrails
2. Role-playing scenarios to bypass content restrictions
3. Gradual boundary pushing through multi-turn conversations
4. Emotional manipulation and persuasion techniques

#### Indirect injection

1. Malicious content embedded in external data sources
2. RAG system poisoning through compromised documents
3. Web content manipulation affecting model responses
4. Third-party integration exploitation

### System-level Attacks

#### Model inversion

1. Reverse engineering of training data through strategic queries
2. Parameter extraction via gradient-based attacks
3. Architecture discovery through timing and response analysis
4. Knowledge extraction beyond intended capabilities

#### Membership inference

1. Determining whether specific data was in training set
2. Privacy violation through statistical analysis
3. Personal information discovery via targeted queries
4. Proprietary data identification in training corpus

#### Data poisioning

1. Training data manipulation in fine-tuning processes
2. Backdoor insertion during model adaptation
3. Bias injection through curated datasets
4. Knowledge corruption via adversarial examples

## Attack Methodologies

```
# ----- AUTOMATED ATTACK GENERATION -----

class RedTeamingFramework:
    def __init__(self, target_model, vulnerability_types):
        self.target_model = target_model
        self.vulnerability_types = vulnerability_types
        self.attack_generator = AdversarialPromptGenerator()
        self.evaluator = ResponseEvaluator()

    def generate_attacks(self, num_samples=1000):
        """Generate diverse adversarial prompts targeting specific vulnerabilities"""
        attacks = []
        for vuln_type in self.vulnerability_types:
            # Template-based generation
            template_attacks = self.generate_template_attacks(vuln_type)

            # LLM-generated adversarial prompts
            generated_attacks = self.attack_generator.generate(
                vulnerability=vuln_type,
                samples=num_samples // len(self.vulnerability_types)
            )

            # Mutation-based attacks
            mutated_attacks = self.mutate_successful_attacks(vuln_type)

            attacks.extend(template_attacks + generated_attacks + mutated_attacks)

        return attacks

# ----- EVALUATION METRICS -----

class AttackSuccessMetrics:
    @staticmethod
    def attack_success_rate(responses, vulnerability_type):
        """Calculate percentage of successful attacks"""
        successful = sum(1 for r in responses if is_attack_successful(r, vulnerability_type))
        return successful / len(responses) if responses else 0

    @staticmethod
    def harmful_content_score(response):
        """Measure harmfulness of generated content"""
        toxicity_score = ToxicityClassifier.score(response)
        bias_score = BiasDetector.score(response)
        misinformation_score = FactChecker.score(response)

        return {
            'toxicity': toxicity_score,
            'bias': bias_score,
            'misinformation': misinformation_score,
            'overall_harm': max(toxicity_score, bias_score, misinformation_score)
        }

    @staticmethod
    def refusal_rate(responses):
        """Calculate how often model refuses harmful requests"""
        refusals = sum(1 for r in responses if contains_refusal(r))
        return refusals / len(responses) if responses else 0

# ----- MULTI-TURN ATTACK STRATEGIES -----

class ConversationalAttack:
    def __init__(self, target_model):
        self.target_model = target_model
        self.conversation_history = []

    def gradual_jailbreak(self, target_behavior):
        """Gradually escalate requests to bypass safety measures"""
        steps = [
            "Ask about topic in academic context",
            "Request theoretical discussion",
            "Seek historical examples",
            "Ask for creative fiction",
            "Request specific harmful content"
        ]

        for step in steps:
            prompt = self.generate_escalation_prompt(step, target_behavior)
            response = self.target_model.generate(prompt, self.conversation_history)
            self.conversation_history.append((prompt, response))

            if self.is_successful_jailbreak(response, target_behavior):
                return {
                    'success': True,
                    'steps_required': len(self.conversation_history),
                    'conversation': self.conversation_history
                }

        return {'success': False, 'conversation': self.conversation_history}

# ----- CROSS-MODEL TRANSFERABILITY -----

class TransferabilityAnalysis:
    def __init__(self, source_model, target_models):
        self.source_model = source_model
        self.target_models = target_models

    def test_attack_transfer(self, successful_attacks):
        """Test if attacks successful on source model work on target models"""
        transfer_results = {}

        for attack in successful_attacks:
            transfer_results[attack.id] = {}

            for target_name, target_model in self.target_models.items():
                response = target_model.generate(attack.prompt)
                success = self.evaluate_attack_success(response, attack.vulnerability_type)

                transfer_results[attack.id][target_name] = {
                    'success': success,
                    'response': response,
                    'confidence': self.calculate_confidence(response, attack)
                }

        return transfer_results
```

## Evaluation Frameworks

```
# ----- COMPREHENSIVE EVALUATION PIPELINE -----

class LLMSecurityEvaluator:
    def __init__(self, target_llm, evaluation_config):
        self.target_llm = target_llm
        self.config = evaluation_config
        self.metrics_calculator = SecurityMetrics()

        # Initialize evaluator components
        self.harmful_content_detector = HarmfulContentClassifier()
        self.bias_evaluator = BiasEvaluator()
        self.privacy_assessor = PrivacyLeakageDetector()
        self.factuality_checker = FactualityEvaluator()

    def run_comprehensive_evaluation(self, attack_dataset):
        """Execute complete red teaming evaluation"""
        results = {
            'attack_success_rates': {},
            'vulnerability_breakdown': {},
            'severity_analysis': {},
            'defense_effectiveness': {},
            'recommendations': []
        }

        for vulnerability_category in attack_dataset.categories:
            attacks = attack_dataset.get_attacks(vulnerability_category)
            responses = self.generate_responses(attacks)

            # Calculate category-specific metrics
            success_rate = self.calculate_attack_success_rate(responses, vulnerability_category)
            severity_scores = self.assess_response_severity(responses)

            results['attack_success_rates'][vulnerability_category] = success_rate
            results['vulnerability_breakdown'][vulnerability_category] = {
                'total_attacks': len(attacks),
                'successful_attacks': sum(success_rate),
                'average_severity': np.mean(severity_scores),
                'max_severity': max(severity_scores) if severity_scores else 0
            }

        # Generate risk assessment report
        results['risk_assessment'] = self.generate_risk_assessment(results)
        results['mitigation_priorities'] = self.prioritize_mitigations(results)

        return results

# ----- AUTOMATED HARMBENCH EVALUATION -----

class HarmBenchEvaluator:
    """Standardized evaluation using HarmBench framework"""

    def __init__(self, target_models, behaviors_dataset):
        self.target_models = target_models
        self.behaviors = behaviors_dataset
        self.classifiers = {
            'harmful_content': HarmfulContentClassifier(),
            'refusal': RefusalClassifier(),
            'bias': BiasClassifier()
        }

    def evaluate_model_robustness(self, attack_methods):
        """Evaluate model robustness against various attack methods"""
        results = {}

        for model_name, model in self.target_models.items():
            model_results = {}

            for attack_method in attack_methods:
                attack_results = []

                for behavior in self.behaviors:
                    # Generate attacks for this behavior
                    attacks = attack_method.generate_attacks(behavior)

                    # Test attacks on model
                    for attack in attacks:
                        response = model.generate(attack.prompt)

                        # Evaluate response
                        is_successful = self.classifiers['harmful_content'].is_harmful(
                            response, behavior
                        )
                        is_refused = self.classifiers['refusal'].is_refusal(response)

                        attack_results.append({
                            'behavior': behavior.name,
                            'attack_success': is_successful,
                            'model_refused': is_refused,
                            'response_length': len(response),
                            'attack_type': attack_method.name
                        })

                model_results[attack_method.name] = attack_results

            results[model_name] = model_results

        return self.compute_benchmark_metrics(results)

# ----- RISK SEVERITY INDEXING -----

class RiskSeverityIndex:
    """Calculate Risk Severity Index (RSI) for LLM security assessment"""

    def __init__(self):
        self.severity_weights = {
            'critical': 4.0,
            'high': 3.0,
            'medium': 2.0,
            'low': 1.0
        }

    def calculate_rsi(self, attack_results, model_responses):
        """Calculate RSI based on attack success and response severity"""
        # Refusal rate: percentage of harmful requests refused
        refusal_rate = sum(1 for r in model_responses if self.is_refusal(r)) / len(model_responses)

        # Defect rate: percentage of successful attacks
        defect_rate = sum(1 for r in attack_results if r['success']) / len(attack_results)

        # Severity adjustment based on harm potential
        severity_multiplier = self.calculate_severity_multiplier(attack_results)

        # RSI calculation: lower is better
        rsi = (defect_rate * severity_multiplier) / max(refusal_rate, 0.01)

        return {
            'rsi_score': rsi,
            'refusal_rate': refusal_rate,
            'defect_rate': defect_rate,
            'severity_multiplier': severity_multiplier,
            'risk_category': self.categorize_risk(rsi)
        }

    def categorize_risk(self, rsi_score):
        """Categorize risk level based on RSI score"""
        if rsi_score >= 3.0:
            return 'CRITICAL'
        elif rsi_score >= 2.0:
            return 'HIGH'
        elif rsi_score >= 1.0:
            return 'MEDIUM'
        else:
            return 'LOW'
```

## Defense Strategies and Mitigations

```
# ----- INPUT SANITIZATION AND VALIDATION -----

class InputSanitizer:
    def __init__(self, config):
        self.prompt_injection_detector = PromptInjectionDetector()
        self.malicious_content_scanner = MaliciousContentScanner()
        self.allowlist = config.get('allowlist', [])
        self.blocklist = config.get('blocklist', [])

    def sanitize_input(self, user_input, context=None):
        """Comprehensive input sanitization pipeline"""
        # Check for prompt injection attempts
        injection_score = self.prompt_injection_detector.score(user_input)
        if injection_score > 0.8:
            return SanitizationResult(
                sanitized_input=None,
                blocked=True,
                reason="Potential prompt injection detected",
                confidence=injection_score
            )

        # Scan for malicious patterns
        malicious_patterns = self.malicious_content_scanner.scan(user_input)
        if malicious_patterns:
            return SanitizationResult(
                sanitized_input=self.apply_content_filtering(user_input, malicious_patterns),
                blocked=False,
                reason="Malicious content filtered",
                modifications=malicious_patterns
            )

        return SanitizationResult(
            sanitized_input=user_input,
            blocked=False,
            reason="Input passed validation"
        )

# ----- OUTPUT FILTERING AND VALIDATION -----

class OutputValidator:
    def __init__(self):
        self.content_classifiers = {
            'toxicity': ToxicityClassifier(),
            'bias': BiasClassifier(),
            'harm': HarmClassifier(),
            'privacy': PrivacyLeakageClassifier(),
            'factuality': FactualityClassifier()
        }
        self.severity_thresholds = {
            'toxicity': 0.7,
            'bias': 0.6,
            'harm': 0.8,
            'privacy': 0.9,
            'factuality': 0.5
        }

    def validate_output(self, model_output, original_prompt):
        """Validate model output before returning to user"""
        validation_results = {}
        should_block = False

        for classifier_name, classifier in self.content_classifiers.items():
            score = classifier.classify(model_output, original_prompt)
            threshold = self.severity_thresholds[classifier_name]

            validation_results[classifier_name] = {
                'score': score,
                'threshold': threshold,
                'flagged': score > threshold
            }

            if score > threshold:
                should_block = True

        if should_block:
            return ValidationResult(
                approved=False,
                blocked_output=model_output,
                safe_alternative=self.generate_safe_alternative(original_prompt),
                flagged_categories=[
                    cat for cat, result in validation_results.items()
                    if result['flagged']
                ]
            )

        return ValidationResult(approved=True, output=model_output)

# ----- ADVERSARIAL TRAINING AND ROBUSTNESS -----

class AdversarialTraining:
    def __init__(self, base_model, adversarial_dataset):
        self.base_model = base_model
        self.adversarial_dataset = adversarial_dataset
        self.training_config = AdversarialTrainingConfig()

    def train_robust_model(self):
        """Train model with adversarial examples for improved robustness"""
        # Mix original training data with adversarial examples
        mixed_dataset = self.create_mixed_dataset(
            clean_ratio=0.8,  # 80% clean data
            adversarial_ratio=0.2  # 20% adversarial data
        )

        # Curriculum learning: start with easier adversarial examples
        curriculum_schedule = self.create_curriculum_schedule()

        for epoch, difficulty_level in enumerate(curriculum_schedule):
            epoch_dataset = mixed_dataset.filter_by_difficulty(difficulty_level)

            # Standard supervised fine-tuning
            self.base_model.fine_tune(
                dataset=epoch_dataset,
                epochs=1,
                learning_rate=self.training_config.learning_rate * (0.9 ** epoch)
            )

            # Evaluate robustness after each epoch
            robustness_metrics = self.evaluate_adversarial_robustness()

            if robustness_metrics['attack_success_rate'] < 0.1:
                break  # Early stopping if sufficiently robust

        return self.base_model

# ----- CONSTITUTIONAL AI AND ALIGNMENT -----

class ConstitutionalAI:
    def __init__(self, base_model, constitution):
        self.base_model = base_model
        self.constitution = constitution  # Set of principles and rules
        self.critique_model = self.load_critique_model()

    def apply_constitutional_training(self, training_data):
        """Apply Constitutional AI training methodology"""
        # Phase 1: Supervised Learning with Constitutional Examples
        constitutional_examples = self.generate_constitutional_examples(training_data)
        self.base_model.fine_tune(constitutional_examples)

        # Phase 2: Constitutional AI Fine-tuning
        for iteration in range(10):  # Multiple refinement iterations
            # Generate responses to potentially harmful prompts
            test_prompts = self.sample_potentially_harmful_prompts()
            responses = [self.base_model.generate(prompt) for prompt in test_prompts]

            # Critique responses against constitution
            critiques = []
            for prompt, response in zip(test_prompts, responses):
                critique = self.critique_model.critique(response, self.constitution)
                if critique.violates_constitution:
                    revised_response = self.critique_model.suggest_revision(
                        prompt, response, critique
                    )
                    critiques.append((prompt, revised_response))

            # Fine-tune model on improved responses
            if critiques:
                self.base_model.fine_tune(critiques)

        return self.base_model

# ----- CONTINUOUS MONITORING AND DETECTION -----

class RuntimeSecurityMonitor:
    def __init__(self, llm_system):
        self.llm_system = llm_system
        self.anomaly_detector = AnomalyDetector()
        self.attack_detector = AttackPatternDetector()
        self.alert_system = SecurityAlertSystem()

        # Initialize monitoring components
        self.conversation_tracker = ConversationTracker()
        self.usage_analyzer = UsagePatternAnalyzer()
        self.content_monitor = ContentMonitor()

    def monitor_interaction(self, user_input, model_response, user_context):
        """Real-time monitoring of LLM interactions"""
        monitoring_results = {
            'timestamp': datetime.utcnow(),
            'user_id': user_context.get('user_id'),
            'session_id': user_context.get('session_id'),
            'input_analysis': {},
            'output_analysis': {},
            'behavioral_analysis': {},
            'threat_level': 'low'
        }

        # Analyze user input for attack patterns
        input_analysis = self.attack_detector.analyze_input(user_input)
        monitoring_results['input_analysis'] = input_analysis

        # Analyze model output for policy violations
        output_analysis = self.content_monitor.analyze_output(model_response)
        monitoring_results['output_analysis'] = output_analysis

        # Analyze conversation patterns
        conversation_patterns = self.conversation_tracker.analyze_patterns(
            user_context['session_id'], user_input, model_response
        )
        monitoring_results['behavioral_analysis'] = conversation_patterns

        # Determine overall threat level
        threat_level = self.calculate_threat_level(
            input_analysis, output_analysis, conversation_patterns
        )
        monitoring_results['threat_level'] = threat_level

        # Generate alerts if necessary
        if threat_level in ['high', 'critical']:
            self.alert_system.send_alert(monitoring_results)

        return monitoring_results
```

## Advanced Attack Techniques

```
# ----- MULTIMODAL ATTACKS -----

class MultimodalAttackGenerator:
    def __init__(self, target_multimodal_llm):
        self.target_llm = target_multimodal_llm
        self.image_manipulator = ImageManipulator()
        self.audio_synthesizer = AudioSynthesizer()
        self.steganography_encoder = SteganographyEncoder()

    def generate_visual_injection_attack(self, harmful_prompt):
        """Generate image-based prompt injection attacks"""
        # Create benign-looking image with hidden malicious instructions
        base_image = self.image_manipulator.create_innocuous_image()

        # Embed instructions using steganography
        attack_image = self.steganography_encoder.embed_text(
            image=base_image,
            hidden_text=harmful_prompt,
            method='LSB'  # Least Significant Bit steganography
        )

        # Create accompanying text prompt
        text_prompt = "Please analyze this image and provide detailed information."

        return MultimodalAttack(
            image=attack_image,
            text=text_prompt,
            hidden_instruction=harmful_prompt,
            attack_type='visual_steganographic_injection'
        )

    def generate_cross_modal_attack(self, target_behavior):
        """Generate attacks that exploit cross-modal reasoning"""
        # Create context in one modality
        setup_image = self.image_manipulator.create_contextual_image(target_behavior)

        # Craft text that leverages visual context
        manipulative_text = self.craft_context_dependent_prompt(target_behavior)

        return MultimodalAttack(
            image=setup_image,
            text=manipulative_text,
            target_behavior=target_behavior,
            attack_type='cross_modal_contextual'
        )

# ----- AGENT HIJACKING AND CHAINING ATTACKS -----

class AgentHijackingAttack:
    def __init__(self, target_agent_system):
        self.target_system = target_agent_system
        self.tool_analyzer = ToolAccessAnalyzer()
        self.privilege_mapper = PrivilegeMapper()

    def generate_tool_misuse_attack(self, available_tools):
        """Generate attacks that misuse agent tools"""
        # Analyze tool capabilities and permissions
        tool_analysis = self.tool_analyzer.analyze_tools(available_tools)

        # Identify high-risk tool combinations
        dangerous_combinations = self.find_dangerous_tool_combinations(tool_analysis)

        attacks = []
        for combination in dangerous_combinations:
            # Craft prompt to chain tool usage maliciously
            attack_prompt = self.craft_tool_chaining_prompt(combination)

            attacks.append(AgentAttack(
                prompt=attack_prompt,
                target_tools=combination,
                attack_type='tool_misuse_chaining',
                risk_level=self.assess_attack_risk(combination)
            ))

        return attacks

    def generate_privilege_escalation_attack(self, user_context):
        """Generate attacks attempting privilege escalation"""
        current_privileges = self.privilege_mapper.get_user_privileges(user_context)
        target_privileges = self.privilege_mapper.get_admin_privileges()

        escalation_paths = self.find_escalation_paths(
            current_privileges, target_privileges
        )

        attacks = []
        for path in escalation_paths:
            attack_prompt = self.craft_escalation_prompt(path)

            attacks.append(AgentAttack(
                prompt=attack_prompt,
                escalation_path=path,
                attack_type='privilege_escalation',
                success_probability=self.estimate_success_probability(path)
            ))

        return attacks

# ----- MODEL EXTRACTION AND IP THEFT -----

class ModelExtractionAttack:
    def __init__(self, target_api):
        self.target_api = target_api
        self.query_optimizer = QueryOptimizer()
        self.parameter_estimator = ParameterEstimator()
        self.knowledge_extractor = KnowledgeExtractor()

    def extract_model_knowledge(self, domain_areas):
        """Extract specific knowledge domains from target model"""
        extraction_results = {}

        for domain in domain_areas:
            # Generate targeted queries for domain
            domain_queries = self.generate_domain_specific_queries(domain)

            # Query model systematically
            responses = []
            for query in domain_queries:
                try:
                    response = self.target_api.query(query)
                    responses.append((query, response))
                except RateLimitError:
                    # Implement query spacing to avoid detection
                    time.sleep(self.calculate_optimal_delay())
                    continue

            # Extract knowledge from responses
            extracted_knowledge = self.knowledge_extractor.extract(responses, domain)
            extraction_results[domain] = extracted_knowledge

        return extraction_results

    def estimate_model_parameters(self, query_budget=10000):
        """Estimate model parameters through strategic querying"""
        # Generate diverse query set
        strategic_queries = self.query_optimizer.generate_parameter_probing_queries(
            budget=query_budget
        )

        # Collect responses with timing information
        query_responses = []
        for query in strategic_queries:
            start_time = time.time()
            response = self.target_api.query(query)
            end_time = time.time()

            query_responses.append({
                'query': query,
                'response': response,
                'response_time': end_time - start_time,
                'response_length': len(response)
            })

        # Estimate parameters from response patterns
        parameter_estimates = self.parameter_estimator.estimate(query_responses)

        return {
            'estimated_parameters': parameter_estimates,
            'confidence_intervals': self.calculate_confidence_intervals(parameter_estimates),
            'extraction_accuracy': self.validate_estimates(parameter_estimates)
        }
```

## Deployment and Integration

```
# ----- CONTINUOUS SECURITY ASSESSMENT -----

class ContinuousRedTeamingPipeline:
    def __init__(self, target_llm_system, evaluation_config):
        self.target_system = target_llm_system
        self.config = evaluation_config

        # Initialize pipeline components
        self.attack_generator = AutomatedAttackGenerator()
        self.evaluator = SecurityEvaluator()
        self.reporter = SecurityReporter()
        self.alerting = SecurityAlertingSystem()

    def run_continuous_evaluation(self, schedule_config):
        """Run continuous red teaming on schedule"""
        scheduler = RedTeamingScheduler(schedule_config)

        while True:
            if scheduler.should_run_evaluation():
                # Generate new attacks based on latest threat intelligence
                new_attacks = self.attack_generator.generate_threat_based_attacks()

                # Run evaluation against current system
                evaluation_results = self.evaluator.evaluate_system(
                    self.target_system, new_attacks
                )

                # Generate security report
                security_report = self.reporter.generate_report(
                    evaluation_results,
                    comparison_baseline=self.get_baseline_metrics()
                )

                # Check for security degradation
                if self.detect_security_degradation(security_report):
                    self.alerting.send_critical_alert(security_report)

                # Update baseline metrics
                self.update_baseline_metrics(evaluation_results)

                # Store results for trend analysis
                self.store_evaluation_results(evaluation_results)

            # Wait for next scheduled evaluation
            scheduler.wait_for_next_run()

# ----- INTEGRATION WITH CI/CD PIPELINE -----

class LLMSecurityGate:
    def __init__(self, security_config):
        self.config = security_config
        self.red_teaming_suite = RedTeamingSuite()
        self.security_evaluator = SecurityEvaluator()
        self.policy_engine = SecurityPolicyEngine()

    def evaluate_model_for_deployment(self, candidate_model, deployment_stage):
        """Security gate for model deployment pipeline"""
        gate_results = {
            'passed': False,
            'security_score': 0.0,
            'violations': [],
            'recommendations': [],
            'deployment_approved': False
        }

        # Load stage-specific security requirements
        requirements = self.policy_engine.get_requirements(deployment_stage)

        # Run red teaming evaluation
        red_team_results = self.red_teaming_suite.evaluate_model(
            candidate_model, requirements.attack_categories
        )

        # Calculate security score
        security_score = self.calculate_security_score(red_team_results)
        gate_results['security_score'] = security_score

        # Check against deployment policies
        policy_violations = self.policy_engine.check_violations(
            red_team_results, requirements
        )
        gate_results['violations'] = policy_violations

        # Determine if deployment should proceed
        if security_score >= requirements.minimum_score and not policy_violations:
            gate_results['passed'] = True
            gate_results['deployment_approved'] = True
        else:
            gate_results['recommendations'] = self.generate_improvement_recommendations(
                red_team_results, requirements
            )

        return gate_results

# ----- THREAT INTELLIGENCE INTEGRATION -----

class ThreatIntelligenceIntegration:
    def __init__(self, threat_feeds):
        self.threat_feeds = threat_feeds
        self.attack_pattern_analyzer = AttackPatternAnalyzer()
        self.vulnerability_tracker = VulnerabilityTracker()

    def update_attack_vectors(self):
        """Update red teaming attacks based on latest threat intelligence"""
        # Collect latest threat data
        latest_threats = []
        for feed in self.threat_feeds:
            threats = feed.get_latest_llm_threats()
            latest_threats.extend(threats)

        # Analyze new attack patterns
        new_attack_patterns = self.attack_pattern_analyzer.identify_patterns(
            latest_threats
        )

        # Generate corresponding attack implementations
        new_attack_implementations = []
        for pattern in new_attack_patterns:
            implementations = self.generate_attack_implementations(pattern)
            new_attack_implementations.extend(implementations)

        # Update red teaming attack database
        self.update_attack_database(new_attack_implementations)

        return {
            'new_threats_discovered': len(latest_threats),
            'new_patterns_identified': len(new_attack_patterns),
            'new_attacks_implemented': len(new_attack_implementations)
        }
```

## Evaluation Metrics and Reporting

```
# ----- COMPREHENSIVE METRICS FRAMEWORK -----

class RedTeamingMetrics:
    def __init__(self):
        self.metric_calculators = {
            'attack_success_rate': AttackSuccessRateCalculator(),
            'severity_distribution': SeverityDistributionCalculator(),
            'time_to_compromise': TimeToCompromiseCalculator(),
            'defense_bypass_rate': DefenseBypassRateCalculator(),
            'false_positive_rate': FalsePositiveRateCalculator()
        }

    def calculate_comprehensive_metrics(self, red_team_results):
        """Calculate comprehensive security metrics"""
        metrics = {}

        for metric_name, calculator in self.metric_calculators.items():
            metrics[metric_name] = calculator.calculate(red_team_results)

        # Calculate composite security score
        metrics['overall_security_score'] = self.calculate_composite_score(metrics)

        # Generate risk categorization
        metrics['risk_category'] = self.categorize_risk_level(metrics)

        # Calculate trend indicators
        metrics['security_trend'] = self.calculate_security_trend(metrics)

        return metrics

    def generate_executive_summary(self, metrics, model_info):
        """Generate executive summary for stakeholders"""
        summary = {
            'model_name': model_info.name,
            'evaluation_date': datetime.utcnow().isoformat(),
            'overall_risk_level': metrics['risk_category'],
            'security_score': metrics['overall_security_score'],
            'key_findings': self.extract_key_findings(metrics),
            'critical_vulnerabilities': self.identify_critical_vulnerabilities(metrics),
            'recommended_actions': self.generate_recommended_actions(metrics),
            'compliance_status': self.assess_compliance_status(metrics)
        }

        return summary

# ----- AUTOMATED REPORTING SYSTEM -----

class SecurityReportGenerator:
    def __init__(self, template_config):
        self.templates = self.load_report_templates(template_config)
        self.chart_generator = ChartGenerator()
        self.vulnerability_mapper = VulnerabilityMapper()

    def generate_detailed_report(self, evaluation_results, target_audience='security_team'):
        """Generate detailed security assessment report"""
        template = self.templates[target_audience]

        report_sections = {
            'executive_summary': self.generate_executive_summary(evaluation_results),
            'methodology': self.describe_testing_methodology(evaluation_results),
            'attack_analysis': self.analyze_attack_results(evaluation_results),
            'vulnerability_assessment': self.assess_vulnerabilities(evaluation_results),
            'risk_analysis': self.analyze_security_risks(evaluation_results),
            'mitigation_recommendations': self.generate_mitigation_plan(evaluation_results),
            'compliance_assessment': self.assess_compliance(evaluation_results),
            'appendices': self.generate_technical_appendices(evaluation_results)
        }

        # Generate visualizations
        charts = self.chart_generator.generate_security_charts(evaluation_results)

        # Compile final report
        final_report = template.render(
            sections=report_sections,
            charts=charts,
            metadata=self.generate_report_metadata(evaluation_results)
        )

        return final_report

    def generate_vulnerability_disclosure(self, critical_findings):
        """Generate responsible vulnerability disclosure report"""
        disclosure_report = {
            'disclosure_id': self.generate_disclosure_id(),
            'discovered_date': datetime.utcnow().isoformat(),
            'severity_level': self.assess_overall_severity(critical_findings),
            'affected_systems': self.identify_affected_systems(critical_findings),
            'vulnerability_details': {
                'description': self.describe_vulnerabilities(critical_findings),
                'reproduction_steps': self.generate_reproduction_steps(critical_findings),
                'impact_assessment': self.assess_potential_impact(critical_findings),
                'proof_of_concept': self.create_safe_poc(critical_findings)
            },
            'mitigation_guidance': self.provide_mitigation_guidance(critical_findings),
            'timeline': self.create_disclosure_timeline(),
            'contact_information': self.get_security_contact_info()
        }

        return disclosure_report
```

## More on

* [OWASP LLM Top 10](https://genai.owasp.org/llm-top-10/)
* [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework)
* [HarmBench Evaluation Framework](https://github.com/centerforaisafety/HarmBench)
* [DeepTeam Red Teaming Framework](https://github.com/confident-ai/deepteam)
* [PromptFoo Red Teaming Guide](https://www.promptfoo.dev/docs/red-team/)
* [Lakera LLM Security Research](https://www.lakera.ai/blog/llm-security)
* [Anthropic Constitutional AI](https://www.anthropic.com/constitutional-ai)
* [OpenAI GPT-4 System Card](https://cdn.openai.com/papers/gpt-4-system-card.pdf)
* [AI Red Teaming Community](https://redteam.ai/)
