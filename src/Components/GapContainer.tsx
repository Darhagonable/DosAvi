import React from "react";
import { FlexStyle, StyleProp, View, ViewStyle } from "react-native";

interface Props extends React.ComponentProps<typeof View> {
  flexDirection?: FlexStyle["flexDirection"];
  flexWrap?: FlexStyle["flexWrap"];
  alignItems?: FlexStyle["alignItems"];
  justifyContent?: FlexStyle["justifyContent"];

  gap?: number;
  gapRow?: number;
  gapCol?: number;

  contentWrapperStyle?: StyleProp<ViewStyle>;
}

export function GapContainer(props: React.PropsWithChildren<Props>) {
  const {
    flexDirection: propsFlexDirection,
    flexWrap: propsFlexWrap,
    alignItems: propsAlignItems,
    justifyContent: propsJustifyContent,

    gap: propsGap,
    gapRow: propsRow,
    gapCol: propsCol,

    contentWrapperStyle: propsContentWrapperStyle,

    ...passthroughProps
  } = props;

  const gap = propsGap ?? 0;
  const gapRow = propsRow ?? gap;
  const gapCol = propsCol ?? gap;

  const contentWrapperStyle: StyleProp<ViewStyle> = [propsContentWrapperStyle, {
    flexDirection: propsFlexDirection,
    flexWrap: propsFlexWrap,
    alignItems: propsAlignItems,
    justifyContent: propsJustifyContent,

    marginHorizontal: -gapRow / 2,
    marginVertical: -gapCol / 2
  }];

  const childStyle: StyleProp<ViewStyle> = {
    marginHorizontal: gapRow / 2,
    marginVertical: gapCol / 2
  };

  function renderChild(child: React.ReactNode) {
    if (child === null) {
      return null;
    }

    return (
      <View
        children={ child }
        style={ childStyle }
      />
    );
  }

  return (
    <View { ...passthroughProps }>
      <View style={ contentWrapperStyle }>
        { React.Children.map(props.children, renderChild) }
      </View>
    </View>
  );
}