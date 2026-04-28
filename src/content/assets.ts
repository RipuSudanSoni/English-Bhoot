import grammarGrammar from '../../assets/content/grammar/grammar.md';
import grammarNoun from '../../assets/content/grammar/noun.md';
import grammarTense from '../../assets/content/grammar/tense.md';
import grammarVerb from '../../assets/content/grammar/verb.md';
import grammarTest from '../../assets/content/grammar/test.md';

export const grammarAssets: Record<string, any> = {
  'grammar/grammar': grammarGrammar,
  'grammar/noun': grammarNoun,
  'grammar/tense': grammarTense,
  'grammar/verb': grammarVerb,
  'grammar/test': grammarTest,
};

export const speakingAssets: Record<string, any> = {
  // Add speaking assets here
};

export const allAssets: Record<string, any> = {
  ...grammarAssets,
  ...speakingAssets,
};
