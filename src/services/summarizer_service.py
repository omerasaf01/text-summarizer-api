import spacy
from spacy.lang.en.stop_words import STOP_WORDS
from string import punctuation
from collections import Counter
from heapq import nlargest
from dtos.responses.summarizer_response import SummarizerResponseDto

nlp = spacy.load("en_core_web_sm")

def summarize_text(text: str):
    doc = nlp(text)
    print(len(list(doc.sents)))

    keywords = []
    stopwords = list(STOP_WORDS)
    pos_tag = ["PROPN", "ADJ", "NOUN", "VERB"]

    for token in doc:
        if token.text in stopwords or token.text in punctuation:
            continue
        if token.pos_ in pos_tag:
            keywords.append(token.text)

    freq_word = Counter(keywords)
    freq_word.most_common(5)

    sent_strength = {}

    for sent in doc.sents:
        for word in sent:
            if word.text in freq_word.keys():
                if sent in sent_strength.keys():
                    sent_strength[sent] += freq_word[word.text]
                else:
                    sent_strength[sent] = freq_word[word.text]

    summarized_sentences = nlargest(3, sent_strength, key=lambda x: sent_strength[x])

    final_sentences = [w.text for w in summarized_sentences]
    summary = " ".join(final_sentences)
    response = SummarizerResponseDto(result = summary)

    return response
