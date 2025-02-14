/**
 * This array contains a collection of Duas (supplications) and Dhikr (remembrance of Allah).
 * Each object in the array represents a dua or dhikr with its title, reference, Arabic text, transliteration, translation, and contextual benefits.
 * 
 * Template to add a Dua/Dhikr:
 * {
 *   title: string,              // Required. The title of the dua or dhikr (e.g., Dua of Musa for Provision).
 *   reference: string,          // Required. The Quranic verse or Hadith where the dua is mentioned.
 *   arabic: string,             // Required. The dua or dhikr in Arabic script.
 *   transliteration: string,    // Required. Transliteration of the Arabic text for pronunciation help.
 *   translation: string,        // Required. The English translation of the dua or dhikr.
 *   context: string             // Required. The context or benefit of the dua, explaining when it was said or its significance.
 * }
 */

export const duasAndDhikr = [
    {
      title: "Dua of Musa ﷺ for Provision",
      reference: "Surah Al-Qasas (28:24)",
      arabic: "رَبِّ إِنِّي لِمَا أَنزَلْتَ إِلَيَّ مِنْ خَيْرٍ فَقِيرٌ",
      transliteration: "Rabbi inni lima anzalta ilayya min khayrin faqeer",
      translation: "My Lord, indeed I am in need of whatever good You send down to me.",
      context: "Musa ﷺ made this dua after fleeing Egypt, alone and in need of sustenance and shelter, teaching us to turn to Allah in times of uncertainty and difficulty. Soon afterwards, Allah blessed him with safety, a job, and a wife, turning his hardship into stability and security."
    },
    {
      title: "Dua of Yunus ﷺ from Belly of a Whale",
      reference: "Surah Al-Anbiya (21:87)",
      arabic: "لَا إِلَـٰهَ إِلَّا أَنتَ سُبْحَانَكَ إِنِّي كُنتُ مِنَ ٱلظَّـٰلِمِينَ",
      transliteration: "La ilaha illa anta, subhanaka inni kuntu min az-zalimeen",
      translation: "There is no deity except You; exalted are You. Indeed, I have been of the wrongdoers.",
      context: "This dua was made by Yunus ﷺ in the belly of the whale. Yunus ﷺ was trapped in three layers of darkness: the darkness of the night, the depth of the ocean, and inside the belly of the whale. Despite this, his sincere repentance and dua led to Allah rescuing him, showing that no situation is too dark for Allah's mercy. Lesson for us is how sincere repentance and acknowledging one's mistakes can lead to Allah’s mercy and deliverance from the darkest of situations."
    },
    {
      title: "Dua for Reliance on Allah",
      reference: "Surah At-Tawbah (9:129)",
      arabic: "حَسْبِيَ اللَّهُ لَا إِلَـٰهَ إِلَّا هُوَ ۖ عَلَيْهِ تَوَكَّلْتُ وَهُوَ رَبُّ الْعَرْشِ الْعَظِيمِ",
      transliteration: "Hasbiyallahu la ilaha illa huwa, 'alayhi tawakkaltu wa huwa rabbul-'arshil-'azeem",
      translation: "Sufficient for me is Allah; there is no deity except Him. On Him I rely, and He is the Lord of the Great Throne.",
      context: "This dua is a profound reminder to place full trust in Allah, especially when facing life’s challenges, as He alone has control over all matters."
    },
    {
      title: "Dua for Seeking Good in Both Worlds",
      reference: "Surah Al-Baqarah (2:201)",
      arabic: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
      transliteration: "Rabbana atina fid-dunya hasanatan wa fil-akhirati hasanatan wa qina 'adhaban-nar",
      translation: "Our Lord, give us in this world [that which is] good and in the Hereafter [that which is] good and protect us from the punishment of the Fire.",
      context: "This dua, often recited by the Prophet ﷺ, asks for both worldly success and eternal salvation. It reminds us to seek balance in life, focusing on both the good of this world and the Hereafter. The Prophet ﷺ recited it during tawaf, emphasizing its importance for comprehensive well-being."
    },
    {
      title: "Dua of Musa ﷺ for Peace and Strength",
      reference: "Surah Taha (20:25-28)",
      arabic: "رَبِّ اشْرَحْ لِي صَدْرِي وَيَسِّرْ لِي أَمْرِي وَاحْلُلْ عُقْدَةً مِّن لِّسَانِي يَفْقَهُوا قَوْلِي",
      transliteration: "Rabbi ishrah li sadri, wa yassir li amri, wahlul 'uqdatan min lisani yafqahu qawli",
      translation: "My Lord, expand for me my chest, ease my task for me, and untie the knot from my tongue, that they may understand my speech.",
      context: "Musa ﷺ made this dua before facing Pharaoh, asking for peace of heart and ease in his mission. Allah answered by giving him strength, clarity in speech, and making his task successful. This shows the power of turning to Allah in difficult moments, asking for calmness and help, especially when facing overwhelming challenges. It reminds us that with Allah's support, even the toughest tasks can become manageable."
    },
    {
      title: "Dua for Parents",
      reference: "Surah Al-Isra (17:24)",
      arabic: "رَبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِيْ صَغِيْرًا",
      transliteration: "Rabbi irhamhuma kama rabbayani sagheera",
      translation: "My Lord, have mercy upon them (my parents) as they raised and nurtured me when I was young.",
      context: "This dua is a reminder for all believers to honor their parents by asking Allah for mercy upon them, acknowledging the love and care they gave us as children. It highlights the Islamic duty of showing gratitude and respect towards parents, especially in their old age."
    },
    {
      title: "Dua for Patience and Steadfastness",
      reference: "Surah Al-A'raf (7:126)",
      arabic: "رَبَّنَا أَفْرِغْ عَلَيْنَا صَبْرًا وَتَوَفَّنَا مُسْلِمِينَ",
      transliteration: "Rabbana afrigh 'alayna sabran wa tawaffana muslimeen",
      translation: "Our Lord, pour upon us patience and let us die as Muslims [in submission to You].",
      context: "This dua, made by the sorcerers during Musa’s ﷺ time as they faced execution for their faith, asks for patience and to die as Muslims. It highlights the importance of remaining steadfast in faith during trials and seeking a righteous end, making it a powerful supplication for strength and trust in Allah."
    },
    {
      title: "Dua for Forgiveness and Guidance",
      reference: "Surah Al-Ahqaf (46:15)",
      arabic: "رَبِّ أَوْزِعْنِي أَنْ أَشْكُرَ نِعْمَتَكَ الَّتِي أَنْعَمْتَ عَلَيَّ وَعَلَىٰ وَالِدَيَّ وَأَنْ أَعْمَلَ صَالِحًا تَرْضَاهُ",
      transliteration: "Rabbi awzi'ni an ashkura ni'mataka allati an'amta 'alayya wa 'ala walidayya wa an a'mala salihan tardahu",
      translation: "My Lord, enable me to be grateful for Your favor which You have bestowed upon me and upon my parents, and to do righteousness of which You approve.",
      context: "This dua asks for the ability to show gratitude and to act in ways that please Allah, recognizing that even our ability to do good comes from His guidance."
    },
    {
      title: "Dua for Forgiveness",
      reference: "Sunan Ibn Majah 3850",
      arabic: "اللَّهُمَّ إِنَّكَ عَفُوٌّ تُحِبُّ الْعَفْوَ فَاعْفُ عَنِّي",
      transliteration: "Allahumma innaka 'afuwwun tuhibbul-'afwa fa'fu 'anni",
      translation: "O Allah, You are forgiving, You love forgiveness, so forgive me.",
      context: "This dua, taught by the Prophet ﷺ to Aisha (R.A.) for Laylatul Qadr, highlights Allah’s love for forgiveness. By calling upon Allah's love for forgiveness, it encourages us to seek His mercy, making it a crucial supplication for attaining Allah’s pardon and blessings."
    },
    {
      title: "Highly Rewarding Dhikr",
      reference: "Sahih Bukhari 6682",
      arabic: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ، سُبْحَانَ اللَّهِ الْعَظِيمِ",
      transliteration: "Subhan Allahi wa bihamdihi, Subhan Allahi al-'Azeem", 
      translation: 'Glory is to Allah, and praise is to Him. Glory is to Allah, the Greatest.',
      context: 'The Prophet ﷺ said: "There are two phrases that are light on the tongue, heavy on the scales, and beloved to the Most Merciful: Subhan Allahi wa bihamdihi, Subhan Allahi al-\'Azeem." (Sahih Bukhari 6682, Sahih Muslim 2694). This dhikr brings immense rewards, highlights Allah\'s perfection and greatness, and is beloved to Allah.'
    },
    ]

