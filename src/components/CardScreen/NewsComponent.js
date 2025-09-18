import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import colors from '../../styles/colors';

const MAX_LINES = 13;

const NewsComponent = ({ data, style, titleEllipsis = false }) => {
  const [showAll, setShowAll] = useState(true);

  if (data && data.isSuccess === false) {
    return (
      <View style={[s.container, style]}>
        <Text style={{ color: 'gray', fontSize: 18 }}>
          error : cannot found data
        </Text>
      </View>
    );
  }
  const color = colors.white000;
  const splitSentences = text => (text ? text.split(/(?<=[.!?…])\s+/) : []);
  const titleSentences = splitSentences(data.title);
  const sentences = splitSentences(data.summary);

  const tag = data.tags && data.tags.length > 0 ? `#${data.tags[0]}` : '';
  const stimulationText = data.epiStimulationReduced
    ? `자극도를 ${data.epiStimulationReduced}% 낮췄어요`
    : null;

  // 본문 전체 텍스트
  const fullText = sentences.join('\n\n');
  // 대략적인 문자 수 제한
  const MAX_CHARS = 20 * MAX_LINES;
  const isOverflow = fullText.length > MAX_CHARS;

  return (
    <View style={[s.container, style]}>
      {showAll ? (
        <View style={{ gap: 4 }}>
          {/* title */}
          <Text
            style={{
              fontSize: 24,
              fontWeight: 'bold',
              color: colors.green600,
            }}
            numberOfLines={titleEllipsis ? 2 : undefined}
            ellipsizeMode={titleEllipsis ? 'tail' : undefined}
          >
            {titleSentences}
          </Text>
          {/* date, tag */}
          <View style={s.tagNdate}>
            <Text style={{ color: colors.gray400 }}>
              {data.originalPublishedAt}
            </Text>
            <View
              style={{
                width: 4,
                height: 4,
                borderRadius: 2,
                backgroundColor: colors.gray400,
              }}
            />
            {tag ? (
              <Text style={{ color: colors.white000, fontSize: 13 }}>
                {tag}
              </Text>
            ) : null}
          </View>
        </View>
      ) : null}

      {/* content */}
      <View style={[{ gap: 12 }]}>
        <View style={[s.stimulationBadge]}>
          <Image
            source={require('../../assets/images/CardScreen/AI_icon.png')}
            style={s.img}
          />
          <Text
            style={{
              color: colors.black000,
              fontSize: 12,
              fontWeight: 'bold',
              opacity: 1,
            }}
          >
            자극도를 58% 낮췄어요
          </Text>
        </View>

        {/* 본문 줄수 제한 + 더보기 */}
        {showAll ? (
          isOverflow ? (
            <View>
              <Text
                style={{
                  fontSize: 16,
                  lineHeight: 24,
                  color,
                }}
                numberOfLines={MAX_LINES}
                ellipsizeMode="tail"
              >
                {fullText}
              </Text>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setShowAll(false)}
              >
                <Text
                  style={{
                    marginTop: 8,
                    fontSize: 15,
                    color: colors.gray500,
                    fontWeight: 'bold',
                  }}
                >
                  더보기
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <Text
              style={{
                fontSize: 16,
                lineHeight: 24,
                color,
              }}
            >
              {fullText}
            </Text>
          )
        ) : (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setShowAll(true)}
          >
            <Text
              style={{
                fontSize: 16,
                lineHeight: 24,
                color,
              }}
              ellipsizeMode="tail"
            >
              {fullText}
              <Text style={{ color: colors.gray500, fontWeight: 'bold' }}>
                {'   '}
                닫기
              </Text>
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default NewsComponent;

const s = StyleSheet.create({
  container: {
    flex: 1,
    gap: 40,
  },
  tagNdate: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stimulationBadge: {
    backgroundColor: colors.white000,
    alignSelf: 'flex-start',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 50,
    paddingHorizontal: 10,
    paddingVertical: 4,
    gap: 6,
  },
  img: {
    width: 14,
    height: 14,
    resizeMode: 'contain',
    // tintColor: colors.white000,
  },
  fullContentScroll: {
    flex: 1,
    backgroundColor: 'rgba(28,26,47,0.98)',
  },
  fullContentClose: {
    marginTop: 40,
    alignSelf: 'center',
    padding: 12,
    backgroundColor: 'rgba(44,44,44,0.7)',
    borderRadius: 20,
  },
});
