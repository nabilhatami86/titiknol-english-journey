import type { ParsedReadingTest } from '@/app/practice/ielts-reading/parser';

export interface IeltsStaticTest extends ParsedReadingTest {
  id: number;
  testTitle: string;
  topics: string;
}

// ─── TEST 1 ───────────────────────────────────────────────────────────────────

const test1: IeltsStaticTest = {
  id: 1,
  testTitle: 'IELTS Academic Reading — Test 1',
  topics: 'History of Tea · Urban Farming · Science of Sleep',
  title: 'IELTS Academic Reading Test 1',
  answerKey: {
    1: 'TRUE', 2: 'TRUE', 3: 'TRUE', 4: 'FALSE', 5: 'TRUE', 6: 'NOT GIVEN', 7: 'NOT GIVEN',
    8: 'medicinal', 9: 'Lu Yu', 10: 'wealthy', 11: 'ale', 12: '342', 13: '50', 14: 'chadō',
    15: 'YES', 16: 'NO', 17: 'YES', 18: 'YES', 19: 'NOT GIVEN', 20: 'NO',
    21: 'organoponicos', 22: '30,000/more than 30,000', 23: 'nutrient-rich water',
    24: 'energy requirements/artificial lighting', 25: 'lost over one million', 26: 'increased', 27: 'renewable energy',
    28: 'FALSE', 29: 'TRUE', 30: 'TRUE', 31: 'TRUE', 32: 'NOT GIVEN', 33: 'NOT GIVEN',
    34: 'obesity', 35: 'common cold', 36: 'cognitive', 37: 'circadian rhythms',
    38: 'suprachiasmatic nucleus', 39: 'shift', 40: 'social',
  },
  passages: [
    {
      number: 1,
      title: 'The History of Tea',
      range: [1, 14],
      html: '',
      questionsHtml: '',
      textHtml: `
<p>Tea is the second most consumed beverage in the world after water, with a history stretching back nearly five thousand years. According to Chinese legend, the Emperor Shen Nong discovered tea in 2737 BCE when dried leaves from a nearby tree fell into his boiling water. However, the earliest credible historical records of tea drinking date to the Han Dynasty (206 BCE–220 CE), when it was consumed primarily for medicinal purposes.</p>
<p>The spread of tea cultivation and consumption throughout Asia was largely facilitated by Buddhist monks. As these monks traveled between monasteries across China, Japan, and Korea, they carried tea plants and knowledge of preparation techniques. By the Tang Dynasty (618–907 CE), tea had become a central part of Chinese culture, and the scholar Lu Yu wrote the first comprehensive guide to tea, known as the <em>Cha Jing</em> or "Classic of Tea." This work described not only the cultivation and preparation of tea but also the philosophical and aesthetic values associated with drinking it.</p>
<p>Tea reached Europe through Portuguese and Dutch trading routes in the early seventeenth century. Initially, it was an expensive luxury reserved for the wealthy, costing as much as ten pounds sterling per pound of leaves in England. The establishment of the East India Company played a crucial role in making tea more accessible to ordinary English people, as the company's monopoly on trade allowed prices to gradually decline over the eighteenth century. By 1750, tea had replaced ale as the most popular drink in England.</p>
<p>The introduction of tea to the Americas was more complicated. While British colonists in North America had adopted the tea-drinking habit, taxation policies imposed by the British Parliament led to significant resistance. The Boston Tea Party of 1773, during which American colonists dumped 342 chests of British East India Company tea into Boston Harbor, became one of the most iconic acts of colonial resistance and contributed to the outbreak of the American Revolution.</p>
<p>Today, tea is cultivated in over 50 countries, with China and India being the largest producers. The global tea market is valued at over 200 billion dollars annually. Despite the rise of coffee culture in many Western nations, tea consumption continues to grow worldwide, particularly as consumers become more health-conscious and interested in the antioxidant properties of green and white teas. The Japanese tea ceremony, known as <em>chadō</em>, continues to be practiced as a highly refined cultural art form, reflecting the enduring spiritual and aesthetic dimensions of tea culture across the world.</p>
      `.trim(),
      sections: [
        {
          label: 'Questions 1–7',
          instruction: 'Do the following statements agree with the information given in the Reading Passage? Write TRUE if the statement agrees, FALSE if it contradicts, or NOT GIVEN if there is no information.',
          type: 'tfng',
          range: [1, 7],
          questions: [
            { number: 1, text: 'Tea was first discovered when leaves accidentally fell into hot water.' },
            { number: 2, text: 'Buddhist monks were important in spreading tea cultivation across Asia.' },
            { number: 3, text: "Lu Yu's Cha Jing included information about tea cultivation techniques." },
            { number: 4, text: 'Tea was cheaper than ale when it first arrived in Europe.' },
            { number: 5, text: 'The East India Company helped reduce the price of tea in England.' },
            { number: 6, text: 'The Boston Tea Party led directly to the signing of the Declaration of Independence.' },
            { number: 7, text: 'China and India together produce more than half of the world\'s tea.' },
          ],
        },
        {
          label: 'Questions 8–14',
          instruction: 'Complete the sentences below. Use NO MORE THAN TWO WORDS from the passage for each answer.',
          type: 'text',
          range: [8, 14],
          questions: [
            { number: 8, text: 'The earliest credible records show tea was consumed mainly for __________ purposes.' },
            { number: 9, text: 'The first comprehensive guide to tea was written by the scholar __________.' },
            { number: 10, text: 'In 17th-century England, tea was initially a luxury for the __________.' },
            { number: 11, text: 'Tea replaced __________ as England\'s most popular drink by 1750.' },
            { number: 12, text: 'American colonists dumped __________ chests of tea into Boston Harbor.' },
            { number: 13, text: 'Tea is now cultivated in over __________ countries worldwide.' },
            { number: 14, text: 'The Japanese tea ceremony is known as __________.' },
          ],
        },
      ],
    },
    {
      number: 2,
      title: 'Urban Farming',
      range: [15, 27],
      html: '',
      questionsHtml: '',
      textHtml: `
<p>Urban farming, the practice of cultivating food within city environments, has experienced remarkable growth over the past two decades. From rooftop gardens in New York City to vertical farms in Singapore, cities around the world are rethinking how food can be produced closer to where it is consumed. Proponents argue that urban agriculture can address food security concerns, reduce carbon emissions associated with food transportation, and provide green spaces that improve mental health and community cohesion.</p>
<p>One of the most successful examples of urban farming is found in Havana, Cuba. Following the collapse of the Soviet Union in 1991, Cuba lost access to heavily subsidized food imports and chemical inputs. Faced with food shortages, the Cuban government launched an urban agriculture program called <strong>organoponicos</strong>, which encouraged citizens to convert vacant urban land into food gardens. By the early 2000s, Havana was producing over 90 percent of its fruit and vegetables locally, employing more than 30,000 urban farmers.</p>
<p>In contrast to Cuba's necessity-driven model, many urban farming initiatives in developed countries are driven by commercial interests and consumer demand for locally grown, organic produce. Companies such as AeroFarms in New Jersey operate large-scale indoor farms using aeroponic technology, in which plant roots are misted with nutrient-rich water rather than grown in soil. These systems can use up to 95 percent less water than traditional farming and eliminate the need for pesticides, as crops grow in a controlled, sterile environment. However, the energy requirements of indoor farms — particularly for artificial lighting — remain a significant economic and environmental challenge.</p>
<p>Community gardens represent a more accessible model of urban farming. These spaces, typically managed collectively by local residents, provide fresh produce while building social connections. Research conducted in Detroit, a city that lost over one million residents between 1950 and 2010, found that community gardens in vacant lots significantly reduced crime rates in surrounding areas and increased neighboring property values. However, critics point out that community gardens rarely produce enough food to make a meaningful contribution to urban food security.</p>
<p>The future of urban farming is likely to involve a combination of technologies and community-based approaches. Experts suggest that advances in LED lighting efficiency and renewable energy integration will make indoor vertical farms more economically viable within the next decade. Meanwhile, policies encouraging rooftop greening and the conversion of underutilized urban spaces could help mainstream community-led growing initiatives. Whether urban farming can play a truly transformative role in feeding cities remains subject to debate, but its social, psychological, and environmental benefits appear well-documented.</p>
      `.trim(),
      sections: [
        {
          label: 'Questions 15–20',
          instruction: 'Do the following statements reflect the claims of the writer? Write YES if the statement reflects the writer\'s claims, NO if it contradicts them, or NOT GIVEN if it is impossible to say.',
          type: 'yn',
          range: [15, 20],
          questions: [
            { number: 15, text: 'Urban farming has the potential to improve community relations in cities.' },
            { number: 16, text: "Cuba's urban farming success was a direct result of government investment in technology." },
            { number: 17, text: 'Indoor aeroponic systems are more water-efficient than traditional farming methods.' },
            { number: 18, text: 'Community gardens in Detroit have been proven to reduce crime rates.' },
            { number: 19, text: 'Advances in LED lighting will soon make indoor farms economically competitive.' },
            { number: 20, text: 'Urban farming alone can solve the problem of food security in large cities.' },
          ],
        },
        {
          label: 'Questions 21–27',
          instruction: 'Answer the following questions. Use NO MORE THAN THREE WORDS from the passage for each answer.',
          type: 'text',
          range: [21, 27],
          questions: [
            { number: 21, text: "What term is used for Cuba's urban agriculture program?" },
            { number: 22, text: 'How many urban farmers were employed in Havana by the early 2000s?' },
            { number: 23, text: 'In aeroponic farming, what are plant roots misted with?' },
            { number: 24, text: 'What significant disadvantage of indoor farms does the passage mention?' },
            { number: 25, text: 'What happened to the population of Detroit between 1950 and 2010?' },
            { number: 26, text: 'What happened to property values near community gardens in Detroit?' },
            { number: 27, text: 'What type of energy integration could make indoor farms more viable?' },
          ],
        },
      ],
    },
    {
      number: 3,
      title: 'The Science of Sleep',
      range: [28, 40],
      html: '',
      questionsHtml: '',
      textHtml: `
<p>Sleep is one of the most fundamental yet poorly understood aspects of human biology. Despite spending approximately one-third of their lives asleep, scientists have long debated the precise biological functions that sleep serves. Historically, sleep was considered a passive state of unconsciousness, but modern neuroscience has revealed it to be a remarkably active process essential to cognitive function, immune health, emotional regulation, and physical restoration.</p>
<p>The human sleep cycle consists of several distinct stages that cycle throughout the night. The initial stages involve light sleep, during which the body begins to relax and brain activity slows. This transitions into deep slow-wave sleep, characterized by large, slow brain waves, which is believed to be critical for physical repair and growth hormone release. The final stage, Rapid Eye Movement (REM) sleep, is associated with vivid dreaming and plays a central role in memory consolidation and emotional processing. A typical adult completes four to six of these cycles per night, each lasting approximately 90 minutes.</p>
<p>The consequences of chronic sleep deprivation are well-documented. Studies have shown that individuals sleeping fewer than six hours per night face significantly elevated risks of obesity, type 2 diabetes, cardiovascular disease, and certain types of cancer. A landmark study by the University of California found that sleep-deprived individuals were four times more likely to develop a common cold when exposed to the rhinovirus compared to those sleeping eight hours or more. Cognitive effects are equally severe: impaired attention, slowed reaction times, and reduced working memory have all been linked to inadequate sleep.</p>
<p>Circadian rhythms, the internal biological clocks that regulate sleep-wake cycles, are governed primarily by light exposure. The discovery of the role of the suprachiasmatic nucleus (SCN), a small region of the brain that responds to light signals received through the eyes, was awarded the Nobel Prize in Physiology or Medicine in 2017. Disruption of circadian rhythms — as occurs in shift workers and frequent transmeridian travelers — is associated with increased health risks and reduced life expectancy. Research suggests that even minor circadian misalignment, such as that caused by social jet lag (sleeping significantly later on weekends than weekdays), can have measurable negative health effects.</p>
<p>In response to growing recognition of sleep's importance, many public health authorities now recommend that adults prioritize obtaining seven to nine hours of sleep per night. However, in many modern societies, structural factors such as work schedules, artificial light exposure from digital devices, and cultural attitudes that equate reduced sleep with productivity continue to make adequate sleep a significant public health challenge.</p>
      `.trim(),
      sections: [
        {
          label: 'Questions 28–33',
          instruction: 'Do the following statements agree with the information in the passage? Write TRUE, FALSE, or NOT GIVEN.',
          type: 'tfng',
          range: [28, 33],
          questions: [
            { number: 28, text: 'Historically, scientists viewed sleep as an active biological process.' },
            { number: 29, text: 'REM sleep is important for consolidating memories.' },
            { number: 30, text: 'Adults typically complete between four and six sleep cycles per night.' },
            { number: 31, text: 'People who sleep fewer than six hours per night are more likely to develop type 2 diabetes.' },
            { number: 32, text: 'The scientists who discovered the role of the SCN were from the University of California.' },
            { number: 33, text: 'Most modern adults in developed countries sleep the recommended seven to nine hours.' },
          ],
        },
        {
          label: 'Questions 34–40',
          instruction: 'Complete the summary below. Use NO MORE THAN TWO WORDS from the passage for each answer.',
          type: 'text',
          range: [34, 40],
          questions: [
            { number: 34, text: 'Studies show people sleeping under six hours face higher risks of __________ and type 2 diabetes.' },
            { number: 35, text: 'Sleep-deprived individuals were more likely to contract a __________ when exposed to the rhinovirus.' },
            { number: 36, text: 'Sleep deprivation causes __________ effects including slower reaction times.' },
            { number: 37, text: 'The sleep-wake cycle is regulated by __________, controlled primarily by light exposure.' },
            { number: 38, text: "The brain region governing circadian rhythms is called the __________." },
            { number: 39, text: 'Disruption of circadian rhythms is seen in __________ workers who work irregular hours.' },
            { number: 40, text: 'Sleeping later on weekends than weekdays is known as __________ jet lag.' },
          ],
        },
      ],
    },
  ],
};

// ─── TEST 2 ───────────────────────────────────────────────────────────────────

const test2: IeltsStaticTest = {
  id: 2,
  testTitle: 'IELTS Academic Reading — Test 2',
  topics: 'Psychology of Color · Decline of Coral Reefs · Evolution of Money',
  title: 'IELTS Academic Reading Test 2',
  answerKey: {
    1: 'TRUE', 2: 'TRUE', 3: 'FALSE', 4: 'TRUE', 5: 'TRUE', 6: 'NOT GIVEN', 7: 'TRUE',
    8: 'intimidation', 9: 'biophilia', 10: 'cleanliness', 11: 'prosperity',
    12: 'appetite', 13: 'precision/calm', 14: 'emotional atmospheres/atmospheres',
    15: 'YES', 16: 'NOT GIVEN', 17: 'NO', 18: 'YES', 19: 'NO', 20: 'YES',
    21: '25 percent', 22: 'zooxanthellae', 23: 'carbon dioxide',
    24: '14 percent', 25: 'herbivorous fish', 26: 'agricultural runoff/excess nutrients',
    27: 'thermotolerant',
    28: 'TRUE', 29: 'FALSE', 30: 'TRUE', 31: 'FALSE', 32: 'TRUE', 33: 'NOT GIVEN',
    34: 'Turkey', 35: 'trusted agents', 36: 'jiaozi', 37: 'alchemy',
    38: 'gold', 39: 'M-Pesa', 40: 'unbanked',
  },
  passages: [
    {
      number: 1,
      title: 'The Psychology of Color',
      range: [1, 14],
      html: '',
      questionsHtml: '',
      textHtml: `
<p>Color is far more than a visual experience; it is a powerful psychological force that shapes human perception, emotion, and behavior. The field of color psychology, which emerged as a formal discipline in the early twentieth century, examines how different wavelengths of visible light are processed by the brain and translated into emotional and physiological responses. While some color associations appear to be culturally learned, others seem to have a more universal biological basis.</p>
<p>The emotional effects of warm colors, such as red and orange, have been studied extensively. Research consistently shows that red environments stimulate arousal, increase heart rate, and can enhance performance on tasks requiring physical strength or speed. A notable study published in the journal <em>Nature</em> found that athletes competing in red sports kits were more likely to win than those in blue, suggesting that color may confer competitive advantages through psychological intimidation and increased confidence in the wearer.</p>
<p>Blue and green, the cool colors, tend to produce the opposite psychological effect. Studies conducted in workplace environments have shown that blue-tinted lighting can improve concentration and reduce feelings of anxiety. The calming effect of green is thought to derive from evolutionary associations with fertile environments and the presence of food and water. This theory, known as the <strong>biophilia hypothesis</strong>, suggests that humans retain innate positive responses to natural colors due to their evolutionary significance.</p>
<p>The cultural dimension of color psychology complicates the universal claims. In Western cultures, white is conventionally associated with purity and cleanliness, while in many East Asian cultures it is the color of mourning. Yellow symbolizes luck and prosperity in China but is sometimes associated with cowardice in English-speaking cultures. These examples illustrate the extent to which cultural learning can override or modify biologically based color responses.</p>
<p>Commercial industries have long exploited color psychology. Fast food chains such as McDonald's and KFC use red and yellow in their branding because these colors stimulate appetite and create a sense of urgency that encourages faster eating and table turnover. Pharmaceutical companies, conversely, favor blue and white packaging to convey cleanliness, precision, and calm. Interior designers routinely advise clients on color choices to achieve desired emotional atmospheres in homes, offices, and healthcare environments.</p>
      `.trim(),
      sections: [
        {
          label: 'Questions 1–7',
          instruction: 'Do the following statements agree with the information in the passage? Write TRUE, FALSE, or NOT GIVEN.',
          type: 'tfng',
          range: [1, 7],
          questions: [
            { number: 1, text: 'Color psychology became a formal discipline in the twentieth century.' },
            { number: 2, text: 'The color red has been shown to increase heart rate.' },
            { number: 3, text: 'Athletes wearing red have a physical advantage due to their clothing material.' },
            { number: 4, text: 'Blue lighting in workplaces can reduce anxiety.' },
            { number: 5, text: 'The biophilia hypothesis suggests green is calming because of evolutionary connections to nature.' },
            { number: 6, text: 'White represents mourning in all East Asian cultures.' },
            { number: 7, text: 'Fast food companies use red and yellow to encourage customers to eat faster and leave sooner.' },
          ],
        },
        {
          label: 'Questions 8–14',
          instruction: 'Complete the sentences below. Use NO MORE THAN TWO WORDS from the passage for each answer.',
          type: 'text',
          range: [8, 14],
          questions: [
            { number: 8, text: 'The study in Nature suggested red sports kits help athletes win through psychological __________.' },
            { number: 9, text: 'The calming effect of green is explained by the __________ hypothesis.' },
            { number: 10, text: 'In Western cultures, white is associated with purity and __________.' },
            { number: 11, text: 'In China, yellow symbolizes luck and __________.' },
            { number: 12, text: 'Fast food chains use red and yellow because these colors stimulate __________.' },
            { number: 13, text: 'Pharmaceutical companies use blue and white packaging to convey cleanliness and __________.' },
            { number: 14, text: 'Interior designers help clients achieve desired __________ through color choices.' },
          ],
        },
      ],
    },
    {
      number: 2,
      title: 'The Decline of Coral Reefs',
      range: [15, 27],
      html: '',
      questionsHtml: '',
      textHtml: `
<p>Coral reefs cover less than one percent of the ocean floor yet support approximately 25 percent of all marine species, earning them the nickname "rainforests of the sea." Despite their ecological importance, coral reefs are under unprecedented threat from a combination of human activities and climate change. Scientists estimate that between 40 and 50 percent of the world's coral reefs have been lost since the 1950s, and current projections suggest that up to 90 percent could disappear by 2050 if greenhouse gas emissions continue at present rates.</p>
<p>Coral bleaching, the most visible symptom of reef stress, occurs when ocean temperatures rise above the thermal tolerance of corals. When this happens, the corals expel the symbiotic algae (called <strong>zooxanthellae</strong>) that live within their tissues and provide them with up to 90 percent of their energy through photosynthesis. Without these algae, corals turn white and, if temperatures remain elevated, die within weeks. The Great Barrier Reef experienced its most severe bleaching events in 2016 and 2017, with surveys indicating that over 50 percent of shallow-water corals in the northern section were lost.</p>
<p>Ocean acidification, caused by the absorption of atmospheric carbon dioxide by seawater, presents an additional threat. As CO₂ dissolves in water, it forms carbonic acid, which reduces ocean pH. Lower pH levels inhibit coral skeleton formation and cause existing skeletons to dissolve, weakening reef structures over time. Research by the Australian Institute of Marine Science found that calcification rates in Great Barrier Reef corals have declined by 14 percent since the 1990s.</p>
<p>Human activities beyond climate change also significantly damage coral ecosystems. Overfishing disrupts the balance of reef food chains, removing herbivorous fish that keep algal growth in check. Without these fish, algae can overgrow and smother corals. Agricultural runoff from coastal areas introduces excess nutrients that cause algal blooms, while physical damage from boat anchors, tourism, and dynamite fishing directly destroys reef structures.</p>
<p>Several restoration techniques are being explored to help reefs recover. Coral gardening, in which fragments of coral are grown in underwater nurseries and transplanted to damaged reefs, has shown promise in the Caribbean and Pacific regions. Scientists are also researching the selective breeding of thermotolerant coral strains that can withstand higher temperatures. However, experts universally agree that these interventions can only succeed in the long term if the underlying drivers of reef degradation — principally greenhouse gas emissions — are substantially reduced.</p>
      `.trim(),
      sections: [
        {
          label: 'Questions 15–20',
          instruction: "Do the following statements reflect the claims of the writer? Write YES if the statement reflects the writer's claims, NO if it contradicts them, or NOT GIVEN if it is impossible to say.",
          type: 'yn',
          range: [15, 20],
          questions: [
            { number: 15, text: 'The writer believes coral reefs are among the most ecologically important marine ecosystems.' },
            { number: 16, text: 'The loss of zooxanthellae is the primary long-term cause of all coral death worldwide.' },
            { number: 17, text: "The Great Barrier Reef's 2016 bleaching event was primarily caused by pollution." },
            { number: 18, text: 'Ocean acidification directly weakens the physical structures of coral reefs.' },
            { number: 19, text: 'Coral gardening alone is sufficient to restore damaged reefs.' },
            { number: 20, text: 'The writer suggests that addressing climate change is essential for reef restoration to succeed.' },
          ],
        },
        {
          label: 'Questions 21–27',
          instruction: 'Answer the questions below. Use NO MORE THAN THREE WORDS from the passage for each answer.',
          type: 'text',
          range: [21, 27],
          questions: [
            { number: 21, text: 'What percentage of marine species do coral reefs support?' },
            { number: 22, text: 'What are the symbiotic algae living within coral tissues called?' },
            { number: 23, text: 'What gas absorbed by seawater causes ocean acidification?' },
            { number: 24, text: 'By what percentage have calcification rates in Great Barrier Reef corals declined since the 1990s?' },
            { number: 25, text: 'What type of fish help control algal growth on coral reefs?' },
            { number: 26, text: 'What causes harmful algal blooms near reef areas according to the passage?' },
            { number: 27, text: 'What type of coral strains are scientists trying to breed through selective breeding?' },
          ],
        },
      ],
    },
    {
      number: 3,
      title: 'The Evolution of Money',
      range: [28, 40],
      html: '',
      questionsHtml: '',
      textHtml: `
<p>Money, in its modern form, is so ubiquitous that it can be difficult to imagine a world without it. Yet for the vast majority of human prehistory, people lived in subsistence communities without any formal system of exchange. The transition from barter to currency represents one of the most transformative developments in human social organization, fundamentally reshaping economic relationships and enabling the growth of complex civilizations.</p>
<p>The earliest known form of commodity money was the use of cattle in ancient Mesopotamia and Egypt, where livestock represented wealth and could be exchanged for goods and services. Grain was also widely used as currency in ancient Egypt, where workers building the pyramids received wages paid in bread and beer. The use of standardized metallic currencies emerged in Lydia (present-day Turkey) around 600 BCE, when King Alyattes minted the first official gold and silver coins. These coins were stamped with a royal seal to guarantee their weight and purity, establishing the principle of state-backed currency that persists to this day.</p>
<p>Paper money originated in Tang Dynasty China (618–907 CE), where merchants who deposited heavy metal coins with trusted agents received lightweight paper receipts that could be used in trade. By the Song Dynasty (960–1279 CE), the Chinese government had begun issuing standardized paper currency known as <strong>jiaozi</strong>. When Marco Polo encountered this system during his travels, he was astonished that people would accept pieces of paper in exchange for valuable goods, describing it in his travel writings as a form of "alchemy."</p>
<p>The development of modern banking and fractional reserve banking in Renaissance Europe fundamentally altered the nature of money. Instead of coins representing physical gold, banks began issuing notes promising to pay the bearer in gold — but only holding a fraction of that gold in reserve, relying on the statistical reality that not all depositors would demand their gold simultaneously. This system, which underpins the entire modern banking industry, dramatically increased the money supply and enabled large-scale investment in trade and industry.</p>
<p>Today, the concept of money is evolving once again. Digital currencies, including cryptocurrencies such as Bitcoin, challenge the traditional state monopoly on currency issuance. Central banks in China, Sweden, and other nations are developing central bank digital currencies (CBDCs) as government-backed digital alternatives to physical cash. Meanwhile, mobile payment systems have transformed everyday transactions in developing countries, with Kenya's M-Pesa platform enabling millions of unbanked citizens to participate in the formal economy through basic mobile phones.</p>
      `.trim(),
      sections: [
        {
          label: 'Questions 28–33',
          instruction: 'Do the following statements agree with the information in the passage? Write TRUE, FALSE, or NOT GIVEN.',
          type: 'tfng',
          range: [28, 33],
          questions: [
            { number: 28, text: 'Cattle were used as a form of money in ancient Mesopotamia.' },
            { number: 29, text: 'Egyptian pyramid workers were paid exclusively in metallic coins.' },
            { number: 30, text: 'The first official coins were minted in Lydia approximately 600 BCE.' },
            { number: 31, text: 'Marco Polo was astonished when he first encountered paper money in China.' },
            { number: 32, text: 'Fractional reserve banking increased the amount of money available for investment.' },
            { number: 33, text: 'Bitcoin is currently accepted as legal tender in the countries developing CBDCs.' },
          ],
        },
        {
          label: 'Questions 34–40',
          instruction: 'Complete the sentences below. Use NO MORE THAN TWO WORDS from the passage for each answer.',
          type: 'text',
          range: [34, 40],
          questions: [
            { number: 34, text: 'The first official coins were minted in Lydia, which is present-day __________.' },
            { number: 35, text: 'Chinese merchants deposited coins with __________ and received paper receipts in return.' },
            { number: 36, text: 'Standardized Chinese paper currency issued during the Song Dynasty was called __________.' },
            { number: 37, text: 'Marco Polo described Chinese paper money as a form of __________.' },
            { number: 38, text: 'Fractional reserve banks held only a fraction of their depositors\' __________ in reserve.' },
            { number: 39, text: "Kenya's mobile payment platform is known as __________." },
            { number: 40, text: 'M-Pesa has enabled millions of __________ citizens to join the formal economy.' },
          ],
        },
      ],
    },
  ],
};

// ─── TEST 3 ───────────────────────────────────────────────────────────────────

const test3: IeltsStaticTest = {
  id: 3,
  testTitle: 'IELTS Academic Reading — Test 3',
  topics: 'Microplastics · The Gig Economy · Human Migration',
  title: 'IELTS Academic Reading Test 3',
  answerKey: {
    1: 'TRUE', 2: 'FALSE', 3: 'NOT GIVEN', 4: 'TRUE', 5: 'FALSE', 6: 'TRUE', 7: 'NOT GIVEN',
    8: 'five millimetres', 9: 'synthetic fibres/synthetic fibers', 10: 'food chain',
    11: 'blood samples', 12: 'biodegradable', 13: 'extended producer', 14: 'single-use plastics',
    15: 'YES', 16: 'NO', 17: 'NOT GIVEN', 18: 'YES', 19: 'NO', 20: 'YES',
    21: 'platform companies/companies', 22: 'zero-hours contracts', 23: 'portable benefits',
    24: 'collective bargaining', 25: 'algorithmic management', 26: 'social protection', 27: 'regulatory frameworks',
    28: 'FALSE', 29: 'TRUE', 30: 'NOT GIVEN', 31: 'TRUE', 32: 'FALSE', 33: 'TRUE',
    34: 'push factors', 35: 'pull factors', 36: 'brain drain', 37: 'remittances',
    38: 'social cohesion', 39: 'climate change', 40: 'climate migrants/climate refugees',
  },
  passages: [
    {
      number: 1,
      title: 'The Microplastics Crisis',
      range: [1, 14],
      html: '',
      questionsHtml: '',
      textHtml: `
<p>Microplastics — plastic particles smaller than five millimetres in diameter — have become one of the most pervasive environmental pollutants of the modern era. First identified as a distinct category of marine pollution by scientists at Plymouth Marine Laboratory in 2004, microplastics are now found in virtually every ecosystem on Earth, from the deepest ocean trenches to Arctic ice cores. Their proliferation reflects the extraordinary durability of synthetic polymers, which can persist in the environment for hundreds of years without fully breaking down.</p>
<p>Microplastics enter the environment through multiple pathways. Primary microplastics are manufactured at small sizes for specific applications: microbeads in personal care products such as exfoliating scrubs, and plastic pellets (nurdles) used as raw material in plastic manufacturing. Secondary microplastics result from the fragmentation of larger plastic items through exposure to sunlight, wind, and wave action. The laundering of synthetic textile garments releases millions of synthetic fibres per wash cycle, making clothing a significant source of microplastic contamination in freshwater systems.</p>
<p>The ecological consequences of microplastic pollution are wide-ranging. Marine organisms, from zooplankton to whales, ingest microplastics either directly or by consuming prey that has already ingested them. This bioaccumulation means that microplastics can concentrate as they move up the food chain, potentially reaching harmful concentrations in apex predators. Laboratory studies have demonstrated that microplastics can cause physical injury to digestive systems, disrupt hormone signaling, and reduce reproductive success in a range of species.</p>
<p>Research into human health effects is still at an early stage, but the findings are concerning. Microplastics have been detected in human blood samples, lung tissue, and placentas. A 2022 study published in <em>Environment International</em> found microplastics in the blood of 80 percent of participants tested. While the long-term health consequences remain unclear, scientists have raised concerns about the potential for microplastics to act as carriers of toxic chemicals, including persistent organic pollutants and heavy metals.</p>
<p>Addressing the microplastics crisis requires action at multiple levels. Technological solutions include improved wastewater filtration systems capable of capturing synthetic fibres before they reach waterways, and the development of biodegradable polymer alternatives. Policy approaches include extended producer responsibility schemes, which require manufacturers to fund the collection and recycling of their plastic products, and bans on single-use plastics, which have been implemented in more than 60 countries. However, experts emphasize that given the scale of existing plastic pollution in the environment, technological and regulatory measures alone will be insufficient without a fundamental reduction in plastic production.</p>
      `.trim(),
      sections: [
        {
          label: 'Questions 1–7',
          instruction: 'Do the following statements agree with the information in the passage? Write TRUE, FALSE, or NOT GIVEN.',
          type: 'tfng',
          range: [1, 7],
          questions: [
            { number: 1, text: 'Microplastics are defined as plastic particles less than five millimetres in size.' },
            { number: 2, text: 'The term "microplastics" was first used by scientists in the United States.' },
            { number: 3, text: 'Microbeads have been banned in personal care products in all countries.' },
            { number: 4, text: 'Secondary microplastics are created when larger plastic items break down.' },
            { number: 5, text: 'Laboratory studies show microplastics have no effect on the reproductive success of marine animals.' },
            { number: 6, text: 'Microplastics have been found in human blood samples.' },
            { number: 7, text: 'More than 100 countries have banned single-use plastics.' },
          ],
        },
        {
          label: 'Questions 8–14',
          instruction: 'Complete the sentences below. Use NO MORE THAN TWO WORDS from the passage for each answer.',
          type: 'text',
          range: [8, 14],
          questions: [
            { number: 8, text: 'Microplastics are defined as plastic particles smaller than __________ in diameter.' },
            { number: 9, text: 'Washing synthetic garments releases millions of __________ per cycle.' },
            { number: 10, text: 'Microplastics can concentrate at harmful levels as they move up the __________.' },
            { number: 11, text: 'Scientists found microplastics in __________ of 80 percent of study participants.' },
            { number: 12, text: 'One technological solution is to develop __________ polymer alternatives to plastic.' },
            { number: 13, text: '__________ responsibility schemes require manufacturers to fund plastic recycling.' },
            { number: 14, text: 'Bans on __________ have been implemented in more than 60 countries.' },
          ],
        },
      ],
    },
    {
      number: 2,
      title: 'The Rise of the Gig Economy',
      range: [15, 27],
      html: '',
      questionsHtml: '',
      textHtml: `
<p>The gig economy — characterized by short-term, flexible work arrangements mediated through digital platforms — has transformed the nature of employment in many countries over the past decade. Platform companies such as Uber, Deliveroo, and TaskRabbit have created new models of work that offer significant flexibility to workers, while also raising fundamental questions about employment rights, income security, and the responsibilities of corporations toward their workforces.</p>
<p>Proponents of the gig economy argue that it democratizes access to work by enabling people to earn income on their own schedule and terms. For students, carers, and those with disabilities who may find traditional employment structures inaccessible, platform work can provide valuable economic participation. Surveys conducted among gig workers in the United States and United Kingdom consistently find that a significant majority value the flexibility of their working arrangements, even when acknowledging lower pay and benefits compared to traditional employment.</p>
<p>Critics, however, argue that the apparent flexibility of gig work often masks a deeply precarious form of employment. Workers classified as independent contractors are typically ineligible for employment protections such as minimum wage guarantees, sick pay, pension contributions, and protection against unfair dismissal. Zero-hours contracts, while not exclusive to the gig economy, are particularly prevalent within it. Research by the Resolution Foundation found that gig workers in the UK earned on average 30 percent less per hour than employees in comparable roles.</p>
<p>The legal status of gig workers has become a major point of contention. In 2021, the UK Supreme Court ruled that Uber drivers must be classified as "workers" rather than independent contractors, entitling them to minimum wage protections and holiday pay. Similar rulings have followed in Spain, France, and the Netherlands, signaling a broader judicial trend toward recognizing the employment-like nature of platform work. However, platform companies have vigorously resisted reclassification, arguing that it would fundamentally undermine the flexible model that both companies and workers value.</p>
<p>Policy solutions being explored include the concept of "portable benefits," in which social protections such as healthcare, retirement savings, and paid leave are attached to the worker rather than the employer, allowing gig workers to accumulate these benefits across multiple jobs. Others advocate for strengthening collective bargaining rights for gig workers to enable them to negotiate better terms with platform companies. Critics of these approaches argue that they risk normalizing algorithmic management and the erosion of social protection that traditional employment provides. What seems certain is that as the gig economy continues to grow, governments will need to develop new regulatory frameworks that balance flexibility with adequate worker protections.</p>
      `.trim(),
      sections: [
        {
          label: 'Questions 15–20',
          instruction: "Do the following statements reflect the claims of the writer? Write YES, NO, or NOT GIVEN.",
          type: 'yn',
          range: [15, 20],
          questions: [
            { number: 15, text: 'The writer believes the gig economy offers genuine benefits to some workers.' },
            { number: 16, text: 'The writer thinks most gig workers prefer traditional employment to platform work.' },
            { number: 17, text: 'Zero-hours contracts are found exclusively within the gig economy.' },
            { number: 18, text: 'The 2021 UK Supreme Court ruling was a significant moment for gig worker rights.' },
            { number: 19, text: 'The writer suggests portable benefits are the best solution to gig economy problems.' },
            { number: 20, text: 'The writer believes governments need to create new policies to regulate the gig economy.' },
          ],
        },
        {
          label: 'Questions 21–27',
          instruction: 'Answer the following questions. Use NO MORE THAN THREE WORDS from the passage for each answer.',
          type: 'text',
          range: [21, 27],
          questions: [
            { number: 21, text: 'What type of companies have created new models of flexible work?' },
            { number: 22, text: 'What type of contracts are particularly common in the gig economy?' },
            { number: 23, text: 'What concept involves attaching social protections to the worker rather than the employer?' },
            { number: 24, text: 'What rights do some advocates want to strengthen for gig workers?' },
            { number: 25, text: 'What management approach do critics worry about normalizing in the gig economy?' },
            { number: 26, text: 'What do critics say traditional employment provides that gig work does not?' },
            { number: 27, text: 'What do governments need to develop to balance flexibility with worker protections?' },
          ],
        },
      ],
    },
    {
      number: 3,
      title: 'Patterns of Human Migration',
      range: [28, 40],
      html: '',
      questionsHtml: '',
      textHtml: `
<p>Migration — the movement of people from one place to another in search of better lives — is as old as humanity itself. The first modern humans migrated out of Africa approximately 70,000 years ago, ultimately populating every habitable corner of the globe. Today, the United Nations estimates that there are approximately 281 million international migrants worldwide, representing around 3.6 percent of the global population. While this figure may seem small, the cultural, economic, and political impacts of migration are disproportionately large.</p>
<p>Migration scholars distinguish between voluntary and forced migration, and between different motivating factors. The standard framework contrasts "push factors" — conditions in the country of origin that compel people to leave, such as poverty, conflict, persecution, and environmental degradation — with "pull factors" — conditions in the destination country that attract migrants, such as economic opportunities, political stability, and family networks. In practice, the distinction between voluntary and forced migration is often blurred, as people may migrate under severe economic duress that, while not constituting legal persecution, leaves them with little genuine choice.</p>
<p>The economic consequences of migration are hotly debated. Receiving countries often benefit from migrant labor filling gaps in both high-skilled and low-skilled sectors. Migrants have founded a disproportionate number of high-growth companies in countries such as the United States and the United Kingdom. However, migration can also place strain on public services in destination areas, and concerns about wage competition — though largely not supported by macroeconomic evidence — feature prominently in anti-immigration discourse. For sending countries, the departure of highly educated workers, known as brain drain, can deprive developing nations of the human capital necessary for economic development.</p>
<p>A countervailing economic force is remittances — money sent by migrants to family members in their countries of origin. In 2022, global remittances reached a record 794 billion dollars, exceeding the combined total of foreign direct investment and official development assistance flowing to low- and middle-income countries. For nations such as Tajikistan, Tonga, and Lebanon, remittances represent over 20 percent of GDP, making migration one of the most effective mechanisms for reducing global poverty at scale.</p>
<p>Looking ahead, climate change is expected to become an increasingly significant driver of human migration. The Intergovernmental Panel on Climate Change (IPCC) projects that rising sea levels, increasing temperatures, and more frequent extreme weather events could displace hundreds of millions of people by 2100. Unlike refugees fleeing persecution, climate migrants currently receive no formal protection under international law, leaving a significant gap in global governance. Addressing the rights and needs of climate migrants is widely recognized as one of the most pressing challenges of the coming decades — one that will require international cooperation on a scale not yet achieved.</p>
      `.trim(),
      sections: [
        {
          label: 'Questions 28–33',
          instruction: 'Do the following statements agree with the information in the passage? Write TRUE, FALSE, or NOT GIVEN.',
          type: 'tfng',
          range: [28, 33],
          questions: [
            { number: 28, text: 'Modern humans began migrating out of Africa approximately 70,000 years ago.' },
            { number: 29, text: 'International migrants currently make up around 3.6 percent of the world population.' },
            { number: 30, text: 'The majority of migrants in the modern world are fleeing armed conflict.' },
            { number: 31, text: 'Global remittances in 2022 were greater than foreign direct investment to developing countries.' },
            { number: 32, text: 'Climate migrants currently receive formal legal protection under international refugee law.' },
            { number: 33, text: 'The IPCC has warned that climate change could force hundreds of millions to migrate by 2100.' },
          ],
        },
        {
          label: 'Questions 34–40',
          instruction: 'Complete the sentences below. Use NO MORE THAN TWO WORDS from the passage for each answer.',
          type: 'text',
          range: [34, 40],
          questions: [
            { number: 34, text: 'Conditions that compel people to leave their home country are called __________.' },
            { number: 35, text: 'Economic opportunities and political stability in destination countries are examples of __________.' },
            { number: 36, text: 'The departure of highly educated workers from developing nations is known as __________.' },
            { number: 37, text: 'Money sent by migrants to family in their home countries is called __________.' },
            { number: 38, text: 'A common concern about migration is the pressure it places on __________ in destination areas.' },
            { number: 39, text: 'According to the IPCC, __________ is expected to become a major driver of future migration.' },
            { number: 40, text: 'People displaced by environmental factors are sometimes referred to as __________.' },
          ],
        },
      ],
    },
  ],
};

export const IELTS_READING_TESTS: IeltsStaticTest[] = [test1, test2, test3];
