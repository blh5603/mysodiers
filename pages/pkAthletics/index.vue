<template>
	<view class="pk-wrap">
		<header>
			<view class="header">PK竞技场</view>
			<navigator url="../index/index" hover-class="none"><image src="/static/images/back.png" mode="" class="pk-banner_back"></image></navigator>
		</header>
		<view class="pk-modules">
			<view class="pk-left" @click="openCreateRoomDialog()">
				<view class="crete-text">我开一局</view>
				<text>创建临时房间</text>
			</view>
			<view class="pk-right" @click="openJoinRoomDialog()">
				<view>加入房间</view>
				<text>加入好友创建的房间</text>
			</view>
			<view
				class="pk-modules_item"
				@click="jumpToPKPage(item)"
				:style="{ backgroundImage: 'url(' + item.img + ')', 'background-repeat': 'no-repeat', backgroundSize: 'cover' }"
				v-for="(item, index) in pkList"
				:key="index"
			>
				<view class="pk-modules_item__sequence">{{ item.name }}</view>
				<image src="/static/images/pk/tool.png" class="pk-modules_item__image"></image>
				<view class="pk-modules_item__num">
					<view>{{ item.desc }}</view>
				</view>
			</view>
		</view>
		<view class="history__flows">
			<view class="history__flows_title">参与记录:</view>
			<view class="history__flows_list">
				<view class="history__flows_item" v-for="(item, index) in historyData" :key="index">
					<view class="history__flows_item--right">
						<view class="flows_item--right_type">10 CIC, 5人</view>
						<view :class="['flows_item--right_status', item.status == '1' ? '' : 'color']">拆弹失败</view>
						<view class="view-details">
							<view class="flows_item--right_time">{{ item.time }}</view>
							<view @click="openDetail(item.status, item.id)">查看详情 ></view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 详情弹框 -->
		<popup ref="popup" :mask-click="true">
			<!-- 成功 -->
			<view v-if="status == 1" class="popup-wrap">
				<image src="/static/images/pk/success.png" mode="" class="success-image"></image>
				<view class="content">
					<view class="num">1000</view>
					<image src="/static/images/pk/replay.png" mode="" class="replay-image"></image>
				</view>
			</view>
			<!-- 失败 -->
			<view v-else="status == 0" class="popup-wrap">
				<image src="/static/images/pk/failed.png" mode="" class="failed-image"></image>
				<view class="content-fail">
					<image src="/static/images/warehouse/pliers.png" mode="" class="pliers-image"></image>
					<view class="num">
						很遗憾!
						<br />
						但您仍获得了
					</view>
					<image src="/static/images/pk/replay.png" mode="" class="replay-image"></image>
				</view>
			</view>
			<image src="/static/images/pk/close.png" mode="" class="close" @click="close"></image>
		</popup>

		<!-- 创建房间 -->
		<popup ref="popupCreateRoom" :mask-click="true">
			<view class="form-wrap">
				<view class="title">
					创建房间
					<image src="/static/images/pk/close.png" mode="" class="close" @click="closeCreateRoomDialog" style="margin-left: auto !important;"></image>
				</view>
				<form>
					<label class="uni-list-cell">
						<view>PK数额：</view>
						<input type="text" v-model="formModel.count" placeholder="0" class="input" placeholder-style="color:#ffffff" />
					</label>
					<label class="uni-list-cell">
						<view>PK最低游戏账户余额：</view>
						<input type="text" v-model="formModel.count" placeholder="0" class="input" placeholder-style="color:#ffffff" />
					</label>
					<label class="uni-list-cell">
						<view>满员人数：</view>
						<input type="text" v-model="formModel.count" placeholder="0" class="input" placeholder-style="color:#ffffff" />
					</label>
					<label class="uni-list-cell">
						<view>PK成功人数：</view>
						<input type="text" v-model="formModel.count" placeholder="0" class="input" placeholder-style="color:#ffffff" />
					</label>
					<label class="uni-list-cell">
						<view>房间密码：</view>
						<input type="password" v-model="formModel.count" placeholder="请填写房间密码" class="input" placeholder-style="color:#ffffff" />
					</label>
					<button type="default" class="form_btn" @click="createRoom()">提交</button>
				</form>
			</view>
		</popup>
		<!-- 进入房间 -->
		<popup ref="popupJoinRoom" :mask-click="true">
			<view class="form-wrap">
				<view class="title">
					进入房间
					<image src="/static/images/pk/close.png" mode="" class="close" @click="closeJoinRoomDialog" style="margin-left: auto !important;"></image>
				</view>
				<form>
					<label class="uni-list-cell">
						<view>密码房间号：</view>
						<input type="text" v-model="formModel.count" placeholder="0" class="input" placeholder-style="color:#ffffff" />
					</label>
					<label class="uni-list-cell">
						<view>房间密码：</view>
						<input type="password" v-model="formModel.count" placeholder="请填写房间密码" class="input" placeholder-style="color:#ffffff" />
					</label>
					<button type="default" class="form_btn" @click="joinRoom()">提交</button>
				</form>
			</view>
		</popup>
	</view>
</template>

<script>
import service from '@/utils/service.js';
import popup from '../../uni_modules/uni-popup/components/uni-popup/uni-popup';
export default {
	components: { popup },
	data() {
		return {
			status: '',
			pkList: [
				{
					name: '2人PK',
					img: '/static/images/pk/center-1.png',
					desc: '10CIC 1 VS 1'
				},
				{
					name: '3人PK',
					img: '/static/images/pk/center-2.png',
					desc: '10CIC 1 VS 2'
				},
				{
					name: '5人PK',
					img: '/static/images/pk/center-3.png',
					desc: '10CIC 1 VS 4'
				},
				{
					name: '10人PK',
					img: '/static/images/pk/center-4.png',
					desc: '10CIC 1 VS 9'
				}
			],
			historyData: [{ id: 0, status: 0, time: '2021-11-06 17:00:00' }, { id: 1, status: 1, time: '2021-11-06 17:00:00' }, { id: 2, status: 0, time: '2021-11-06 17:00:00' }],
			// 创建房间的参数
			formModel: {
				count: 0
			}
		};
	},
	methods: {
		// TODO：获取参与记录
		loadpkData() {},

		// 跳转详情
		openDetail(status, id) {
			this.status = status;
			// this.$refs.popup.open('center');
			uni.navigateTo({
				url: './detail?id=' + id
			})
		},
		// 关闭详情
		close() {
			this.$refs.popup.close('center');
		},
		openCreateRoomDialog() {
			this.$refs.popupCreateRoom.open('top');
		},
		closeCreateRoomDialog() {
			this.$refs.popupCreateRoom.close('center');
		},
		// TODO：创建房间
		createRoom() {},
		openJoinRoomDialog() {
			this.$refs.popupJoinRoom.open('top');
		},
		closeJoinRoomDialog() {
			this.$refs.popupJoinRoom.close('center');
		},
		// 加入房间
		joinRoom() {},
		// 跳转PK页面
		jumpToPKPage(item){
			uni.navigateTo({
				url: './pk?data=' + JSON.stringify(item)
			})
		}
	},
	onPullDownRefresh() {
		// TODO: 下拉刷新
		setTimeout(() => {
			uni.stopPullDownRefresh();
		}, 1000);
	},
	onReachBottom() {
		let timer = null;
		//阻止重复加载
		if (timer !== null) {
			clearTimeout(timer);
		}
		timer = setTimeout(() => this.loadpkData(), 500);
	}
};
</script>

<style lang="scss">
page {
	width: 100%;
	min-height: 100%;
	background: url(../../static/images/pk/bg.png) no-repeat;
	background-size: 100% 100%;
}
header {
	z-index: 1;
	position: fixed;
	left: 0;
	right: 0;
	height: 94rpx;
	.pk-banner_back {
		position: absolute;
		width: 139rpx;
		height: 94rpx;
		top: 45rpx;
	}
	.header {
		width: 100%;
		height: 94rpx;
		line-height: 94rpx;
		font-size: 36rpx;
		color: #ffffff;
		margin-top: 45rpx;
		text-align: center;
	}
}
.pk-modules {
	display: flex;
	flex-wrap: wrap;
	padding: 160rpx 16rpx 16rpx;
	justify-content: space-between;
	.pk-left,
	.pk-right {
		margin: 16rpx;
		padding: 18rpx;
		width: calc(100% / 2 - 72rpx);
		height: 120rpx;
		color: #ffffff;
		text {
			display: block;
			width: 58%;
			margin-left: auto;
			font-size: 18rpx;
		}
		view {
			margin-top: 30rpx;
			width: 58%;
			margin-left: auto;
			font-size: 30rpx;
			font-weight: 530;
		}
	}
	.pk-left {
		background: url(../../static/images/pk/bg-create.png) no-repeat;
		background-size: 100% 100%;
		.crete-text {
			color: #ffdd75;
		}
	}
	.pk-right {
		background: url(../../static/images/pk/bg-join.png) no-repeat;
		background-size: 100% 100%;
	}
	.pk-modules_item {
		cursor: pointer;
		position: relative;
		width: calc(100% / 2 - 72rpx);
		border-radius: 14rpx;
		margin: 16rpx;
		padding: 18rpx;
		text-align: center;
		display: flex;
		flex-direction: column;
		align-items: center;
		.pk-modules_item__image {
			height: 150rpx;
			width: 150rpx;
			margin: 60rpx 0 40rpx;
		}
		.pk-modules_item__num {
			display: flex;
			height: 50rpx;
			flex-direction: column;
			font-size: 28rpx;
			line-height: 50rpx;
			align-items: center;
			justify-content: center;
			color: #ffffff;
			font-weight: 500;
		}
		.pk-modules_item__sequence {
			height: 30rpx;
			width: 100%;
			text-align: center;
			font-size: 24rpx;
			line-height: 30rpx;
			margin-top: -10rpx;
			padding-left: 20rpx;
			color: #ffffff;
		}
	}
}
.history__flows {
	padding: 32rpx;
	color: #ffffff;
	.history__flows_title {
		font-size: 32rpx;
		padding-bottom: 32rpx;
	}
	.history__flows_list {
		.history__flows_item {
			margin: 24rpx 0;
			border: 1px solid #2d76a2;
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 32rpx;
			border-radius: 12rpx;
			.history__flows_item--right {
				flex: 1;
				.flows_item--right_type {
					font-size: 30rpx;
				}
				.flows_item--right_status {
					margin-top: 24rpx;
					font-size: 24rpx;
				}
				.color {
					color: #f9a864;
				}
				.view-details {
					display: flex;
					justify-content: space-between;
					font-size: 24rpx;
					margin-top: 24rpx;
				}
			}
		}
	}
}

.uni-popup {
	.popup-wrap {
		position: relative;
	}
	.success-image {
		height: 460rpx;
		width: 460rpx;
	}
	.failed-image {
		height: 572rpx;
		width: 460rpx;
	}
	.content {
		position: absolute;
		bottom: 40rpx;
		left: 35%;
		text-align: center;
	}
	.num {
		color: #a15c1a;
		font-size: 40rpx;
		font-weight: bold;
	}
	.replay-image {
		display: block;
		width: 126rpx;
		height: 60rpx;
		margin-top: 20rpx;
	}
	.pliers-image {
		width: 97rpx;
		height: 97rpx;
	}
	.content-fail {
		position: absolute;
		bottom: 40rpx;
		left: 50%;
		margin-left: -230rpx;
		text-align: center;
		width: 100%;
		.replay-image {
			margin-left: 165rpx;
		}
	}
	.close {
		width: 80rpx;
		height: 80rpx;
		margin-left: 190rpx;
	}
	.form-wrap {
		background: linear-gradient(to bottom, #11739d, #126c9a, #0b5b8f);
		.title {
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 40rpx;
		}
	}
}
</style>
