'use client';
import { toAbbrevNumber } from '@/utils/format';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { Avatar } from '@mui/material';
import moment from 'moment';
import * as React from 'react';
import { WrapperAnimation } from '..';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IComment } from '@/configs/interface';
import { contants } from '@/utils/contants';
import { faHeart as faHeartFill } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';

export interface ICommentProps {
    item?: boolean;
    data: IComment;
}

export default function Comment({ item, data }: ICommentProps) {
    const __SIZE_AVARTAR = '3.4rem';

    return (
        <div className="w-full">
            <div className="flex items-center justify-between">
                <div className="flex items-start gap-3">
                    <Avatar sx={{ width: __SIZE_AVARTAR, height: __SIZE_AVARTAR }} src={data.user.avatar || contants.avartarDefault} />

                    <div className="flex flex-col items-start">
                        <h4 className="text-[15px] font-medium text-post-primary">{data.user.displayName || data.user.username}</h4>
                        <p className="text-sm">{data.comment}</p>
                        <div className="text-sm flex items-center gap-2 mt-1 capitalize">
                            <span>{moment(new Date()).fromNow() === 'a few seconds ago' ? 'now' : moment(new Date()).fromNow()}</span>
                            <span className="hover:underline cursor-pointer">{toAbbrevNumber(data.likes)} Likes</span>
                            <span className="hover:underline cursor-pointer">Reply</span>
                        </div>

                        {item && data.children.length > 0 && (
                            <div className="flex items-center text-sm hover:underline gap-1 mt-1 cursor-pointer">
                                <span className="w-[25px] h-[1px] bg-[#333333]"></span>
                                <span>Show more replies ({data.children.length})</span>
                            </div>
                        )}
                    </div>
                </div>

                <WrapperAnimation className="cursor-pointer" hover={{}}>
                    <FontAwesomeIcon
                        className={classNames('w-4 h-w-4', {
                            ['text-inherit']: !data.isLike,
                            ['text-fill-heart']: data.isLike,
                        })}
                        icon={data.isLike ? faHeartFill : faHeart}
                    />
                </WrapperAnimation>
            </div>

            {item && data.children.length > 0 && (
                <div
                    style={{
                        paddingLeft: `calc(${__SIZE_AVARTAR} + 14px)`,
                    }}
                    className="mt-3"
                >
                    {data.children.map((item) => {
                        return <Comment data={item} key={item.id} />;
                    })}
                </div>
            )}
        </div>
    );
}
