import React, {useEffect, useState} from 'react';
import {View, Text, SafeAreaView} from 'react-native';

import UnstyleButton from '../../../../components/UnstyleButton';
import DateDropDown from '../../../../components/DateDropDown';
import {daysCollection, generateTimeOptions} from '@/utils/utils';
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import {useSelector} from 'react-redux';
import {currentUser} from '@/redux/reducer';
import {putUpdateWeeklyWrapTime} from '@/utils/routes';

const WeeklyWrapUpTimeScreen = () => {
  const [days, setDays] = useState('Monday');
  const [times, setTimes] = useState('12:00 AM');
  const currentUserUUID = useSelector(currentUser);
  const queryClient = useQueryClient();

  const {data: userData = []} = useQuery<any>({
    queryKey: ['fetchUserInfo', currentUserUUID],
  });

  useEffect(() => {
    if (userData && userData?.setting) {
      const weeklyWraptime = userData?.setting.weeklyWrapTime;
      if (weeklyWraptime?.Days && weeklyWraptime?.Times) {
        setTimes(weeklyWraptime?.Times);
        setDays(weeklyWraptime?.Days);
      }
    }
  }, [userData]);

  const handleSave = useMutation({
    mutationFn: async () =>
      putUpdateWeeklyWrapTime({Days: days, Times: times}, currentUserUUID),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['fetchUserInfo', currentUserUUID],
      });
    },
  });

  const handleSaveWeeklylWrapTime = async () => {
    handleSave.mutate();
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="h-[10%]" />
      <Text className="text-lg font-sans text-gray-500 text-center mb-6 px-2">
        We will let you see what’s expiring, plan meals and generate grocery
        list.
      </Text>
      <Text className="text-lg font-sans text-gray-500 text-center mb-6 px-2">
        When is a good time for your wrap up?
      </Text>
      {days && times && (
        <Text className="text-lg font-sans text-gray-500 text-center mb-6 px-2">
          {days} {times}
        </Text>
      )}
      <View className="flex-row justify-between w-[90%] mb-[20%] mx-auto">
        <DateDropDown
          options={daysCollection}
          placeholder="Firday"
          containerStyle={{width: '45%'}}
          dropdownOptionsStyle={{left: -35, right: -225}}
          onSelected={day => {
            setDays(day);
          }}
        />
        <DateDropDown
          options={generateTimeOptions()}
          placeholder="8:00 PM"
          containerStyle={{width: '45%'}}
          dropdownOptionsStyle={{left: -235, right: -30}}
          onSelected={time => {
            setTimes(time);
          }}
        />
      </View>
      <UnstyleButton
        text="Continue"
        backgroundColor="rgb(81, 179, 125)"
        onPress={handleSaveWeeklylWrapTime}
        style={{alignSelf: 'center', zIndex: -1}}
      />
    </SafeAreaView>
  );
};

export default WeeklyWrapUpTimeScreen;
